from flask import jsonify, request, make_response
from sqlalchemy.exc import IntegrityError
from ..models import User
from .. import db
from . import api
from .errors import bad_request

'''
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"ridhoq", "email": "ridwanhoq@gmail.com, "password": "bizness"}
'''
@api.route('/users/', methods=['POST'])
def new_user():
    if request.headers['content_type'] == 'application/json':
        payload = request.get_json()
        if not request.json or \
                not 'email' in payload or \
                not 'username' in payload or \
                not 'password' in payload:
            message = 'the payload aint right'
            return bad_request(message)
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




