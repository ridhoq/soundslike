from flask import url_for
from dateutil.parser import *
import json
import pytest
import base64

@pytest.mark.usefixtures('client_class', 'db', 'session')
class TestUsersApi():
    def test_new_user_invalid_payload(self):
        data = ''
        res = self.client.post(url_for('api.new_user'), data=data)
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'that aint json'

    def test_new_user_empty_payload(self):
        data = dict()
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_user_missing_fields(self):
        data = dict(email='test@test.com', username='test')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

        data = dict(username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

        data = dict(email='test@test.com', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'the payload aint right'

    def test_new_user_invalid_fields(self):
        data = dict(email='test@test.com', username='test', password='12345')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'password must be 6 or more characters'

        data = dict(email='testtest.com', username='test', password='123456')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'email must be valid'

    def test_new_user_success(self) :
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        assert res.json['email'] == data['email']
        assert res.json['username'] == data['username']
        assert parse(res.json['member_since'])
        assert len(res.json.keys()) == 3

    def test_new_user_duplicate(self):
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'this user already exists'

    def test_new_user_duplicate_repeatedly(self):
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'this user already exists'
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400
        assert res.json['error'] == 'bad request'
        assert res.json['message'] == 'this user already exists'

    def test_get_user_success(self):
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        auth_str = 'Basic ' + base64.b64encode(b'test:password').decode('utf-8')
        res = self.client.get( url_for('api.get_user', username=data['username'] ), headers={'Authorization':auth_str})
        assert res.status_code == 200
        assert res.json['email'] == data['email']
        assert res.json['username'] == data['username']
        assert res.json['member_since']

    def test_get_non_existant_user(self):
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        auth_str = 'Basic ' + base64.b64encode(b'test:password').decode('utf-8')
        res = self.client.get( url_for('api.get_user', username='test2' ), headers={'Authorization':auth_str})
        assert res.status_code == 404
        assert res.json['error'] == 'This route does not exist'
