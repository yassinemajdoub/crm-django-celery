from django.urls import path
from .views import (
    ClientListCreateView,
    ClientRetrieveUpdateDeleteView,
    OrderListCreateView,
    OrderRetrieveUpdateDeleteView,
    ProductListCreateView,
    ProductRetrieveUpdateDeleteView,
    ScheduledTaskListCreateView,
    ScheduledTaskRetrieveUpdateDestroyView,
    SendEmailView
)

urlpatterns = [
    path('clients/', ClientListCreateView.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientRetrieveUpdateDeleteView.as_view(), name='client-retrieve-update-delete'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDeleteView.as_view(), name='order-retrieve-update-delete'),
     path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDeleteView.as_view(), name='product-retrieve-update-delete'),
    path('scheduled-tasks/', ScheduledTaskListCreateView.as_view(), name='scheduledtask-list-create'),
    path('scheduled-tasks/<int:pk>/', ScheduledTaskRetrieveUpdateDestroyView.as_view(), name='scheduledtask-detail'),
    path('send-email/', SendEmailView.as_view(), name='send_email'),
]


