#!/bin/sh

python manage.py collectstatic --no-input
python manage.py migrate
gunicorn ticketsenseweb.wsgi --bind=0.0.0.0:80
