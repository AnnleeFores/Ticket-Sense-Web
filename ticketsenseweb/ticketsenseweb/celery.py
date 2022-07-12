from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from datetime import timedelta

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ticketsenseweb.settings')

app = Celery('ticketsenseweb')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.timezone = 'Asia/Kolkata'
 
app.conf.beat_schedule = {
    "every_thirty_seconds": {
        "task": "ticketsense.tasks.thirty_second_func",
        "schedule": timedelta(seconds=60),
    },
}

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

