from flask import Flask
from flask import send_from_directory
from flask.ext.httpauth import HTTPBasicAuth
from .database import db
from config import config
import os

auth = HTTPBasicAuth()


def create_app(config_name):
    app = Flask(__name__, static_url_path='/static')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return app.send_static_file('index.html')

    return app
