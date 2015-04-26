from . import db
from flask import current_app
from datetime import datetime
from werkzeug import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from sqlalchemy.orm import validates

class Song(db.Model):
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    url = db.Column(db.String(256), unique=True)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password
        self.member_since = datetime.utcnow()

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(self.validate_password(password))

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expiration):
        s = Serializer(current_app.config['SECRET_KEY'],
                       expires_in=expiration)
        return s.dumps({'id': self.id}).decode('ascii')

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['id'])

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, "email must be valid"
        return email

    def validate_password(self, password):
        assert len(password) >= 6, "password must be 6 or more characters"
        return password

    def to_json(self):
        json_user = {
            'username': self.username,
            'email': self.email,
            'member_since': self.member_since
        }
        return json_user
