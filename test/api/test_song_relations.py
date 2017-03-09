from flask import url_for
from app.models import User,Song
from dateutil.parser import *
import json
import pytest
import base64

@pytest.mark.usefixtures('client_class', 'db_class')
class TestSongRelationsApi():

    # test users
    hiphop_user = {
        'username': 'hiphop',
        'email': 'hiphop@soundslike.io',
        'password': 'ifyoudontknownowyouknow'
    }
    edm_user = {
        'username': 'edm',
        'email': 'edm@soundslike.io',
        'password': 'edmedm'
    }
    indie_user = {
        'username': 'indie',
        'email': 'indie@soundslike.io',
        'password': 'indieindie'
    }

    users = {'hiphop': hiphop_user,
             'edm': edm_user,
             'indie': indie_user}

    # test songs
    hiphop_song_1 = {
        'title': 'Best Friend',
        'artist': 'Young Thug',
        'url': 'https://www.youtube.com/watch?v=Tz6OUIjtM6E'
    }
    hiphop_song_2 = {
        'title': 'We the People....',
        'artist': 'A Tribe Called Quest',
        'url': 'https://www.youtube.com/watch?v=vO2Su3erRIA'
    }
    edm_song_1 = {
        'title': 'Never Be Like You feat. Kai',
        'artist': 'Flume',
        'url': 'https://www.youtube.com/watch?v=-KPnyf8vwXI'
    }
    edm_song_2 = {
        'title': 'GLOWED UP (feat. Anderson .Paak)',
        'artist': 'Flume',
        'url': 'https://www.youtube.com/watch?v=yaWesK-nWts'
    }
    indie_song_1 = {
        'title': 'i know there\'s gonna be (good times) ft. young thug, popcaan',
        'artist': 'jamie xx',
        'url': 'https://www.youtube.com/watch?v=bjlbb-tma84'
    }
    indie_song_2 = {
        'title': '1901',
        'artist': 'Phoenix',
        'url': 'https://www.youtube.com/watch?v=HL548cHH3OY'
    }

    songs = {'hiphop': (hiphop_song_1, hiphop_song_2),
             'edm': (edm_song_1, edm_song_2),
             'indie': (indie_song_1, indie_song_2)}

    def get_auth_str(self, user):
        return 'Basic ' + base64.b64encode( \
            (user['username'] + ':' +user['password']) \
                .encode('utf-8')).decode('utf-8')

    def get_auth_header(self, user):
        return {'Authorization': self.get_auth_str(user)}

    def test_setup(self):
        # add users to database
        for user in self.users.values():
            user_obj = User(username=user['username'],
                            email=user['email'],
                            password=user['password'])
            self.db.session.add(user_obj)

        self.db.session.commit()

        # add songs to database
        for username, st in self.songs.items():
            user_obj = User.query.filter_by(username=username).first()
            song1 = Song(title=st[0]['title'],
                         artist=st[0]['artist'],
                         url=st[0]['url'],
                         user=user_obj)
            song2 = Song(title=st[1]['title'],
                         artist=st[1]['artist'],
                         url=st[1]['url'],
                         user=user_obj)
            self.db.session.add(song1)
            self.db.session.add(song2)

            # use actual song objects in songs dict (so we have ids)
            song1 = Song.query.filter_by(title=song1.title).first()
            song2 = Song.query.filter_by(title=song2.title).first()
            song1_dict = self.songs[username][0]
            song2_dict = self.songs[username][1]
            song1_dict['id'] = song1.id
            song2_dict['id'] = song2.id
            self.songs[username] = (song1_dict, song2_dict)
        self.db.session.commit()

    def test_new_song_relation_invalid_payload(self):
        data = ''
        res = self.client.post(url_for('api.new_song_relation'),
                               headers=self.get_auth_header(self.users['hiphop']),
                               data=data)
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'that aint json'

    def test_new_song_relation_empty_payload(self):
        data = dict()
        res = self.client.post(url_for('api.new_song_relation'),
                               headers=self.get_auth_header(self.users['hiphop']),
                               content_type='application/json',
                               data=json.dumps(data))
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_song_relation_missing_fields(self):
        data = dict(song2_id=self.songs['hiphop'][1]['id'])
        res = self.client.post(url_for('api.new_song_relation'),
                               headers=self.get_auth_header(self.users['hiphop']),
                               content_type='application/json',
                               data=json.dumps(data))
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

        data = dict(song1_id=self.songs['hiphop'][0]['id'])
        res = self.client.post(url_for('api.new_song_relation'),
                               headers=self.get_auth_header(self.users['hiphop']),
                               content_type='application/json',
                               data=json.dumps(data))
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_song_relation_no_auth(self):
        data = dict(song1_id=self.songs['hiphop'][0]['id'],
                    song2_id=self.songs['hiphop'][1]['id'])
        res = self.client.post(url_for('api.new_song_relation'),
                               content_type='application/json',
                               data=json.dumps(data))
        assert res.status_code == 401
        assert res.json['error'] == 'unauthorized'
        assert res.json['message'] == 'Invalid credentials'

    def test_new_song_relation_relate_song_to_self(self):
        data = dict(song1_id=self.songs['hiphop'][0]['id'],
                    song2_id=self.songs['hiphop'][0]['id'])
        res = self.client.post(url_for('api.new_song_relation'),
                               headers=self.get_auth_header(self.users['hiphop']),
                               content_type='application/json',
                               data=json.dumps(data))
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'cannot relate a song to itself'
