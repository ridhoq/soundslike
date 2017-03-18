from flask import Flask
from flask import send_from_directory
from flask.ext.httpauth import HTTPBasicAuth
from .database import db
from config import config
import os
from flask import make_response

auth = HTTPBasicAuth()


def create_app(config_name):
    basedir = config["default"].basedir
    app = Flask(__name__, static_folder=os.path.join(basedir, "ui-dist"), static_url_path='')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    from .site import site as site_blueprint
    app.register_blueprint(site_blueprint, url_prefix='')

    return app
