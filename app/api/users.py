from flask import jsonify, request, make_response
from sqlalchemy.exc import IntegrityError
from ..models import User
from .. import db, auth
from . import api
from .errors import bad_request, route_not_found

'''
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"ridhoq", "email": "ridwanhoq@gmail.com, "password": "bizness"}
'''
@api.route('/users/', methods=['POST'])
def new_user():
    if request.headers['content_type'] == 'application/json':
        payload = request.get_json()
        # validate payload
        if not request.json or \
                not 'email' in payload or \
                not 'username' in payload or \
                not 'password' in payload:
            message = 'the payload aint right'
            return bad_request(message)

        # validate that user doesn't already exist
        if User.query.filter_by(username=payload['username']).first() or \
            User.query.filter_by(email=payload['email']).first():
            message = 'this user already exists'
            return bad_request(message)

        # save user to db
        try:
            user = User(email=payload['email'], username=payload['username'], password=payload['password'])
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify(user.to_json()), 200)
        except IntegrityError:
            message = 'this user already exists'
            return bad_request(message)
        except AssertionError as ex:
            return bad_request(ex.args[0])
        except Exception as ex:
            template = "An exception of type {0} occured. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            return bad_request(message)
    else:
        message = 'that aint json'
        return bad_request(message)

@api.route('/users/<username>')
@auth.login_required
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return route_not_found(user)
    return make_response(jsonify(user.to_json()), 200)
