from flask import jsonify, request, make_response, abort
from ..models import User
from .. import db
from . import api
import pytest

'''
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"ridhoq", "email": "ridwanhoq@gmail.com, "password": "bizness"}
'''
@api.route('/users/', methods=['POST'])
def new_user():
    print('hello')
    if request.headers['content_type'] == 'application/json':
        print('its a json!')
        payload = request.get_json()
        print(payload)
        if not request.json or \
                not 'email' in payload or \
                not 'username' in payload or \
                not 'password' in payload:
            print(request.json)
            print(payload)
            print('the payload aint right')
            abort(400)
        try:
            user = User(email=payload['email'], username=payload['username'], password=payload['password'])
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify(user.to_json()), 200)
        except Exception as ex:
            template = "An exception of type {0} occured. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            print(message)
            abort(400)
    else:
        print('that aint json')
        abort(400)





