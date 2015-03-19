from flask import jsonify
from . import api

@api.route('/songs/<name>')
def song(name):
    return jsonify(name=name)
