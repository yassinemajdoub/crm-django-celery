from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Client,Order,Product,ScheduledTask
from .serializers import ClientSerializer,OrderSerializer,ProductSerializer,ReadOrderSerializer,ScheduledTaskSerializer,SendEmailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

class SendEmailView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SendEmailSerializer(data=request.data)
        
        if serializer.is_valid():
            client_id= serializer.validated_data.get("client_id")
            email_message = serializer.validated_data.get('email_message')
            subject = serializer.validated_data.get('subject')

            try:
                client = Client.objects.get(id=client_id)
            except Client.DoesNotExist:
                return Response({'message': 'Client not found'})

            subject = subject  # Customize the email subject
            body = email_message  # Use the email message from the request
            sender = settings.EMAIL_HOST_USER   # Set the sender email address
            recipient_list = [client.email]

            
            try:
                send_mail(subject, body, sender, recipient_list)
                return Response({'message': 'Email sent successfully'})
            except Exception as e:
                return Response({'message': f'Failed to send email: {str(e)}'}, status=500)
        else:
            print(serializer.errors)  # Add this debug print
            return Response(serializer.errors, status=400)


class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ScheduledTaskListCreateView(generics.ListCreateAPIView):
    queryset = ScheduledTask.objects.all()
    serializer_class = ScheduledTaskSerializer

class ScheduledTaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScheduledTask.objects.all()
    serializer_class = ScheduledTaskSerializer    


class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ReadOrderSerializer  # Serializer for GET requests
        else:
            return OrderSerializer

class OrderRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
