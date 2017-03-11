from . import db
from flask import current_app
from datetime import datetime
from werkzeug import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from sqlalchemy.orm import validates
import re

class Song(db.Model):
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    artist = db.Column(db.String(256))
    url = db.Column(db.String(256), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, title, artist, url, user):
        self.title = title
        self.artist = artist
        self.url = url
        self.user_id = user.id
        self.created = datetime.utcnow()

    @validates('url')
    def validate_url(self, key, url):
        # regex from http://stackoverflow.com/a/19377429
        youtube_regex = r'^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$'
        assert re.match(youtube_regex, url) is not None, 'not a youtube url'
        return url

    def to_json(self):
        json_song = {
            'id': self.id,
            'title': self.title,
            'artist': self.artist,
            'url': self.url,
            'created': self.created,
            'created_by': self.user.to_json()
        }

        return json_song

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    member_since = db.Column(db.DateTime(), default=datetime.utcnow())
    songs_created = db.relationship('Song', backref='user', lazy='dynamic')
    created = db.Column(db.DateTime(), default=datetime.utcnow())

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

class SongRelation(db.Model):
    __tablename__ = 'song_relations'
    id = db.Column(db.Integer, primary_key=True)
    song1_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    song2_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created = db.Column(db.DateTime(), default=datetime.utcnow())
    __table_args__ = (db.UniqueConstraint('song1_id', 'song2_id', name='uc_song_relation'),)

    def __init__(self, song1_id, song2_id, user):
        self.song1_id = song1_id
        self.song2_id = song2_id
        self.user_id = user.id
        self.created = datetime.utcnow()

    def to_json(self):
        json_song_relation = {
            'song1': Song.query.filter_by(id=self.song1_id).first().to_json(),
            'song2': Song.query.filter_by(id=self.song2_id).first().to_json(),
            'created': self.created,
            'created_by': User.query.filter_by(id=self.user_id).first().to_json()
        }
        return json_song_relation

class SongRelationVote(db.Model):
    __tablename__ = 'song_relation_votes'
    id = db.Column(db.Integer, primary_key=True)
    song_relation_id = db.Column(db.Integer, db.ForeignKey('song_relations.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    has_voted = db.Column(db.Boolean)
    created = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, song_relation_id, user):
        self.song_relation_id = song_relation_id
        self.user_id = user.id
        self.has_voted = True
        self.created = datetime.utcnow()

'''
    -- count votes for a given relation
    select count(*)
    from song_relation_votes
    where relation_id = {my_relation_id}
    and has_voted = 1

    -- get all the song relation pairs this user has voted for
    select s1.title, s2.title
    from song_relations sr
    join songs s1 on s1.id = sr.song1_id
    join songs s2 on s2.id = sr.song2_id
    join song_relation_votes svr on svr.relation_id = sr.id
    where svr.user_id = {my_user_id}
    and svr.has_voted = 1

    -- get top 10 songs related to this song
    select top 10 s.title, s.artist, s.url, count(srv.*)
    from songs s
    join song_relations sr on sr.song1_id = s.id or sr.song2_id = s.id
    join song_relation_votes srv on srv.relation_id = sr.id
    join songs srs on (srs.id = sr.song1_id and srs.id <> sr.song2_id)
    or (srs.id = sr.song2_id and srs.id <> sr.song1_id)
    where s.id = {my_song_id}
    order by count(srv.*)


'''
