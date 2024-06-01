from rest_framework.serializers import ModelSerializer
from website.models import Product, Order, OrderItem, CartItem
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


from rest_framework import serializers

class ProductSerializer(ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product 
        fields = ('id', 'name', 'description', 'price', 'quantity', 'image', 'category', 'category_name')


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order 
        fields = '__all__'

class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem 
        fields = '__all__'

UserModel = get_user_model()
class ProfileSerializer(ModelSerializer):
    class Meta:
        model = UserModel 
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order 
        fields = ['id', 'user', 'total_amount', 'status', 'created_at', 'name', 'address', 'phone_number', 'items']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Password field should be write-only
        }

    def update(self, instance, validated_data):
        # Update the user's first name and last name
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        
        # Update the password if provided
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance