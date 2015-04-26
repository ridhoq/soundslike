from flask import make_response, jsonify
from . import api

@api.app_errorhandler(404)
def route_not_found(error):
    return make_response(jsonify({'error': 'This route does not exist'}), 404)

def unauthorized(message):
    return make_response(jsonify({'error': 'unauthorized', 'message': message}), 401)

def bad_request(message):
    return make_response(jsonify({'error': 'bad request', 'message': message}), 400)

