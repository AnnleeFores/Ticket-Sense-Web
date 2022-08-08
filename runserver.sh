#!/bin/sh

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
gunicorn ticketsenseweb.wsgi --bind=0.0.0.0:80
# celery -A ticketsenseweb worker -l info -n a1
# celery -A ticketsenseweb.celery beat -l INFO
