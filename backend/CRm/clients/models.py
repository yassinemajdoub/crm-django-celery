from django.db import models
# from .signals import *


# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    # Add any additional fields as per your requirements

class Order(models.Model):
    STATUS_CHOICES = [
        ("paid", "Paid"),
        ("unpaid", "Unpaid"),
    ]

    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status=models.CharField(max_length=25,choices=STATUS_CHOICES, default='unpaid')
    start_date = models.DateField()
    end_date = models.DateField()
    quantity_months = models.PositiveIntegerField(blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True)


class ScheduledTask(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='task_scheduled')
    days_before = models.IntegerField()
    
    def __str__(self):
        return f"{self.order} - {self.days_before} days before"


