release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn ticketsenseweb.wsgi --log-file -
worker: cd scrapsense && scrapyrt
celery: celery -A ticketsenseweb worker -l info -n a1
celerybeat: celery -A ticketsenseweb.celery beat -l INFO
