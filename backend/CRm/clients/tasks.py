from CRm.celery_app import app
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import Order
from django.conf import settings

@app.task
def send_email_notification(order_id, days_before):
    try:
        order = Order.objects.get(pk=order_id)
        subject = f"Reminder: Your order is expiring soon ({days_before} days)"
        message = f"Dear {order.client.name}, your order {order.product.name} is ending in {days_before} days. Please make the payment before that."
        from_email = settings.EMAIL_HOST_USER  # Replace with your email
        to_email = [order.client.email]
        send_mail(subject, message, from_email, to_email, fail_silently=False)
    except Order.DoesNotExist:
        pass

@app.task
def schedule_email_notifications():
    orders = Order.objects.filter(status="unpaid")
    for order in orders:
        days_before = (order.end_date - timezone.now().date()).days
        if days_before in [2, 7]:
            # Check if the task has already been scheduled for this order and days_before
            task_scheduled = order.task_scheduled.filter(days_before=days_before).exists()

            if not task_scheduled:
                # Schedule the task
                order.task_scheduled.create(days_before=days_before)
                schedule = order.end_date - timedelta(days=days_before)
                send_email_notification.apply_async(args=[order.id, days_before], eta=schedule)
