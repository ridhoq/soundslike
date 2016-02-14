from flask import jsonify
from . import api
from .. import db, auth

@api.route('/songs/<name>')
def song(name):
    return jsonify(name=name)

@api.route('/songs/', methods=['POST'])
@auth.login_required
def new_song():
    pass
