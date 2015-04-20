.PHONY: test

all: run

run:
	python manage.py runserver

test:
	py.test
