.PHONY: test gunicorn run

all: run

run:
	python manage.py runserver

test:
	py.test

gunicorn:
	python manage.py gunicorn
