from flask import url_for, jsonify
from datetime import datetime
from dateutil.parser import *
import json
import pytest

@pytest.mark.usefixtures('client_class')
class TestUsersApi():
    def test_new_user_empty_payload(self):
        data = dict()
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

    def test_new_user_missing_fields(self):
        data = dict(email='test@test.com', username='test')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

        data = dict(username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

        data = dict(email='test@test.com', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

    def test_new_user_invalid_fields(self):
        data = dict(email='test@test.com', username='test', password='12345')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

        data = dict(email='testtest.com', username='test', password='123456')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 400

    def test_new_user_success(self):
        data = dict(email='test@test.com', username='test', password='password')
        res = self.client.post(url_for('api.new_user'), data=json.dumps(data), content_type='application/json')
        assert res.status_code == 200
        assert res.json['email'] == data['email']
        assert res.json['username'] == data['username']
        assert parse(res.json['member_since'])
        assert len(res.json.keys()) == 3
