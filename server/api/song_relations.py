from flask import jsonify, request, make_response, g
from sqlalchemy.exc import IntegrityError
from ..models import SongRelation, SongRelationVote
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

            # check if we got the same song id for both ids
            if song1_id == song2_id:
                message = 'cannot relate a song to itself'
                return bad_request(message)

            # check if we got a duplicate song relation
            if SongRelation.query.filter_by(song1_id=song1_id, song2_id=song2_id).first() is not None or \
               SongRelation.query.filter_by(song1_id=song2_id, song2_id=song1_id).first() is not None:
                message = 'this song relation already exists'
                return bad_request(message)

            song_relation = SongRelation(song1_id, song2_id, g.current_user)
            db.session.add(song_relation)
            db.session.commit()
            vote_song_relation_helper(song_relation.id)
            return make_response(jsonify(song_relation.to_json(g.current_user)), 200)

        except Exception as ex:
            template = "An exception of type {0} occured. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            return bad_request(message)

    else:
        message = 'that aint json'
        return bad_request(message)

@api.route('/song_relations/<int:id>/vote', methods=['POST'])
@auth.login_required
def vote_song_relation(id):
    if SongRelationVote.query.filter_by(song_relation_id=id, user_id=g.current_user.id).first():
        message = 'you''ve already voted for this song relation'
        return bad_request(message)
    vote_song_relation_helper(id)
    song_relation = SongRelation.query.filter_by(id=id).first()
    return make_response(jsonify(song_relation.to_json(g.current_user)), 200)

@api.route('/song_relations/<int:id>/vote', methods=['DELETE'])
@auth.login_required
def delete_vote_song_relation(id):
    song_relation_vote = SongRelationVote.query.filter_by(song_relation_id=id, user_id=g.current_user.id).first()
    if song_relation_vote is None:
        message = 'this user has not voted for this relation'
        return bad_request(message)
    db.session.delete(song_relation_vote)
    db.session.commit()
    song_relation = SongRelation.query.filter_by(id=id).first()
    return make_response(jsonify(song_relation.to_json(g.current_user)), 200)

def vote_song_relation_helper(song_relation_id):
    song_relation_vote = SongRelationVote(song_relation_id, g.current_user)
    db.session.add(song_relation_vote)
    db.session.commit()
