from server import create_app
from server import db as _db
from config import TestingConfig

from alembic.command import upgrade, downgrade
from alembic.config import Config
from flask.ext.migrate import Migrate
import pytest
import os

basedir = os.path.abspath(os.path.dirname(__file__))
ALEMBIC_CONFIG_PATH = os.path.join(basedir, 'migrations/alembic.ini')
ALEMBIC_CONFIG = Config(ALEMBIC_CONFIG_PATH)

@pytest.fixture(scope='session')
def app(request):
    app = create_app('testing')

    ctx = app.app_context()
    ctx.push()

    def teardown():
        ctx.pop()

    request.addfinalizer(teardown)
    return app


@pytest.fixture(scope='session')
def db(app, request):
    """Session-wide test database."""

    # callback to clean up database
    def teardown():
        _db.session.close_all()
        downgrade(ALEMBIC_CONFIG, 'base')

    migrate = Migrate(app, _db)
    _db.app = app

    # set database conn str
    ALEMBIC_CONFIG.set_main_option('sqlalchemy.url', app.config['SQLALCHEMY_DATABASE_URI'])

    # apply database migrations
    upgrade(ALEMBIC_CONFIG, 'head')

    request.addfinalizer(teardown)
    return _db

@pytest.fixture
def db_class(request, db):
    if request.cls is not None:
        request.cls.db = db

@pytest.fixture(scope='function')
def session(db, request):
    """Creates a new database session for a test."""
    connection = db.engine.connect()
    transaction = connection.begin()

    options = dict(bind=connection, binds={})
    session = db.create_scoped_session(options=options)

    db.session = session

    def teardown():
        transaction.rollback()
        connection.close()
        session.remove()

    request.addfinalizer(teardown)
    return session
