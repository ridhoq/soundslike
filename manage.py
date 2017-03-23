#!/usr/bin/env python
import os
import sys
from app import create_app, db
from flask.ext.script import Manager, Command, Option
from flask.ext.migrate import Migrate, MigrateCommand

class GunicornCommand(Command):
    """Run the app within Gunicorn"""

    def get_options(self):
        from gunicorn.config import make_settings

        settings = make_settings()
        options = (
            Option(*klass.cli, action=klass.action)
            for setting, klass in settings.items() if klass.cli
        )
        return options

    def run(self, *args, **kwargs):
        from gunicorn.app.wsgiapp import WSGIApplication
        app = WSGIApplication()
        app.app_uri = 'manage:app'
        return app.run()


app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)
manager.add_command('gunicorn', GunicornCommand)

if __name__ == '__main__':
    manager.run()

