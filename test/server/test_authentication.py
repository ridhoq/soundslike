from flask import url_for
import json
from server.models import User
import pytest
import base64

@pytest.mark.usefixtures('client_class', 'db_class')
class TestAuth():
    user = User(username='kawhi', email='kleonard@spurs.com', password='donthurtmepop')

    def test_user_auth_with_username_password(self):
        self.db.session.add(self.user)
        self.db.session.commit()
        auth_str = 'Basic ' + base64.b64encode(b'kawhi:donthurtmepop').decode('utf-8')
        res = self.client.post(url_for('api.get_token'), headers={'Authorization': auth_str})
        assert res.status_code == 200
        assert res.json['token']
        print(res.json['token'])

    def test_user_auth_with_username_password_then_token(self):
        self.db.session.add(self.user)
        self.db.session.commit()
        auth_str = 'Basic ' + base64.b64encode(b'kawhi:donthurtmepop').decode('utf-8')
        res = self.client.post(url_for('api.get_token'), headers={'Authorization': auth_str})
        assert res.status_code == 200
        assert res.json['token']
        print(res.json['token'])
        auth_str = 'Basic ' + base64.b64encode((res.json['token'] + ':').encode('utf-8')).decode('utf-8')
        res = self.client.get(url_for('api.get_user', username=self.user.username), headers={'Authorization': auth_str})
        assert res.status_code == 200


