#!/usr/bin/env python
import os
import sys
from server import create_app, db
from flask.ext.script import Manager, Command, Option
from flask.ext.migrate import Migrate, MigrateCommand
from sqlalchemy.sql import text

class GunicornCommand(Command):
    """Run the server within Gunicorn"""

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

class SeedCommand(Command):
    """Seed soundslike db with initial data"""

    def run(self, *args, **kwargs):
        with open('./scripts/seed-db.sql', 'r') as seed_sql_file:
            seed_sql_str = seed_sql_file.read()
            seed_sql = text(seed_sql_str, autocommit=True)
            print(seed_sql)
            db.engine.execute(seed_sql)

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)
manager.add_command('gunicorn', GunicornCommand)
manager.add_command('seed', SeedCommand)

if __name__ == '__main__':
    manager.run()

