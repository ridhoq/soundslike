import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    basedir = os.path.abspath(os.path.dirname(__file__))

    @staticmethod
    def init_app(app):
        pass



class DevelopmentConfig(Config):
    DEBUG = True
    SQLITE_FILE = 'data-dev.sqlite'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, SQLITE_FILE)


class TestingConfig(Config):
    TESTING = True
    SQLITE_FILE = 'data-test.sqlite'
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, SQLITE_FILE)
    SQLALCHEMY_COMMIT_ON_TEARDOWN = False

class ProductionConfig(Config):
    SQLITE_FILE = 'data.sqlite'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, SQLITE_FILE)


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}
