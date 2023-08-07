from rest_framework import serializers
from .models import Client,Order,Product,ScheduledTask

class ReadClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ReadProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class SendEmailSerializer(serializers.Serializer):
    client_id = serializers.IntegerField()
    email_message = serializers.CharField()   
    subject = serializers.CharField()       

class ReadOrderSerializer(serializers.ModelSerializer):
    client=ReadClientsSerializer()
    product=ReadProductsSerializer()

    class Meta:
        model = Order
        fields = ('id','client', 'product', 'start_date','status','end_date','total','quantity_months')
        extra_kwargs = {
            'total': {'read_only': True},
            'quantity_months': {'read_only': True}
        }

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id','client', 'product', 'start_date','status','end_date','total','quantity_months')
        extra_kwargs = {
            'total': {'read_only': True},
            'quantity_months': {'read_only': True}
        }

    def create(self, validated_data):
        # Calculate the quantity_months if not manually specified
        start_date = validated_data.get('start_date')
        end_date = validated_data.get('end_date')
        if not validated_data.get('quantity_months') and start_date and end_date:
            # Calculate the difference in months between start and end dates
            months_diff = (
                (end_date.year - start_date.year) * 12
                + (end_date.month - start_date.month)
            )
            validated_data['quantity_months'] = months_diff

        # Calculate the total based on the price and quantity
        product = validated_data.get('product')
        quantity_months = validated_data.get('quantity_months', 0)
        if product and quantity_months:
            total = product.price * quantity_months
        else:
            total = 0  # Set a default value if either the product or quantity is not specified
        validated_data['total'] = total

        # Create the order
        order = Order.objects.create(**validated_data)
        return order

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


        def create(self, validated_data):
            # Perform additional validation and logic
            # Example: Check if the product name is unique before creating the product
            phone = validated_data['phone']
            if Client.objects.filter(phone=phone).exists():
                raise serializers.ValidationError("Product with this name already exists.")

            # Create the product
            client = Client.objects.create(**validated_data)    

            return client
        

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

        def create(self, validated_data):
            # Perform additional validation and logic
            # Example: Check if the product name is unique before creating the product
            name = validated_data['name']
            if Product.objects.filter(name=name).exists():
                raise serializers.ValidationError("Product with this name already exists.")

            # Create the product
            product = Product.objects.create(**validated_data)    

            return product


class ScheduledTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledTask
        fields = ['id', 'order', 'days_before']
 
        