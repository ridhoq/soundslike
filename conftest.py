from app import create_app
import pytest

@pytest.fixture
def app():
    app = create_app('testing')
    return app
