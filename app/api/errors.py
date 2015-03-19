from flask import jsonify
from . import api

@api.app_errorhandler(404)
def route_not_found(error):
    return jsonify(error='This route does not exist')
