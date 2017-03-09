from flask import jsonify, request, make_response
from sqlalchemy.exc import IntegrityError
from ..models import User
from .. import db, auth
from . import api
from .errors import bad_request, route_not_found

@api.route('/song_relations/', methods=['POST'])
@auth.login_required
def new_song_relation():
    # check if json
    if request.headers['content_type'] == 'application/json':
        payload = request.get_json()

        if not request.json or \
        not 'song1_id' in payload or \
        not 'song2_id' in payload:
            message = 'the payload aint right'
            return bad_request(message)

        try:
            song1_id = payload['song1_id']
            song2_id = payload['song2_id']
            if song1_id == song2_id:
                message = 'cannot relate a song to itself'
                return bad_request(message)

        except Exception as ex:
            template = "An exception of type {0} occured. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            return bad_request(message)

    else:
        message = 'that aint json'
        return bad_request(message)

def new_song_and_song_relation():
    pass

def get_song_relations():
    pass

def vote_song_relation():
    pass

def unvote_song_relation():
    pass