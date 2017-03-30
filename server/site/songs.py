from . import site
from ..models import Song
from flask import make_response, send_from_directory

@site.route('/songs/<int:id>')
def get_song(id):
    song = Song.query.filter_by(id=id).first()
    if not song:
        return site.send_static_file("index.html"), 404
    return site.send_static_file("index.html"), 200
