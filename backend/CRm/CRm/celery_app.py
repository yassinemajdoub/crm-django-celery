# celery.py
import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CRm.settings')

# Create a Celery app instance
app = Celery('CRm')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# This will make sure that the @shared_task decorator is used for all tasks.
app.autodiscover_tasks()

# Start the worker
if __name__ == '__main__':
    app.start()
