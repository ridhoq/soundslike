from flask import url_for
from app.models import User
#from dateutil.parser import *
import json
import pytest
import base64

@pytest.mark.usefixtures('client_class', 'db_class')
class TestSongsApi():

    mock_user = {
                  'username': 'ridwan',
                  'email': 'ridwan@soundslike.io',
                  'password': '1234567'
                }

    def test_add_user(self):
        user = User(username=self.mock_user['username'], \
                    email=self.mock_user['email'], \
                    password=self.mock_user['password'])
        self.db.session.add(user)
        self.db.session.commit()
        assert_user = User.query.filter_by(username='ridwan').first()
        assert assert_user.username == self.mock_user['username']

    def get_auth_str(self):
        return 'Basic ' + base64.b64encode( \
                          (self.mock_user['username'] + ':' +self.mock_user['password']) \
                          .encode('utf-8')).decode('utf-8')

    def test_new_song_invalid_payload(self):
        data = ''
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=data)
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'that aint json'

    def test_new_song_empty_payload(self):
        data = dict()
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_song_missing_fields(self):
        data = dict(title='Silver', artist='Caribou')
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_song_invalid_fields(self):
        data = dict(title='Flashing Lights', artist='Kanye West', url='https://www.reddit.com/r/hiphopheads/')
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'not a youtube url'

    def test_new_song_no_auth(self):
        data = dict(title='Can\'t Tell Me Nothing', artist='Kanye West', url = 'https://www.youtube.com/watch?v=E58qLXBfLrs')
        res = self.client.post(url_for('api.new_song'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 401
        assert res.json['error'] == 'unauthorized'
        assert res.json['message'] == 'Invalid credentials'

    def test_new_song_success(self):
        data = dict(title='Can\'t Tell Me Nothing', artist='Kanye West', url = 'https://www.youtube.com/watch?v=E58qLXBfLrs')
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        assert res.json['title'] == data['title']
        assert res.json['artist'] == data['artist']
        assert res.json['url'] == data['url']
        assert res.json['id']
        assert res.json['created_by']['username'] == self.mock_user['username']

    def test_new_song_duplicate(self):
        data = dict(title='DARE', artist='Gorillaz', url = 'https://www.youtube.com/watch?v=uAOR6ib95kQ')
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        res = self.client.post(url_for('api.new_song'), headers={'Authorization': self.get_auth_str()}, data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'this song already exists'
