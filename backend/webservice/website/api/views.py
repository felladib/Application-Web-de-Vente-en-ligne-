from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import ProductSerializer,ProfileSerializer, OrderSerializer, CartItemSerializer, UserUpdateSerializer
from website.models import Product,Category,Order,OrderItem, CartItem
from django.http import Http404
from django.shortcuts import get_object_or_404



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET']) 
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

@api_view(['GET']) #We created a private route
def getProducts(request):
    prod = Product.objects.all()
    serializer = ProductSerializer(prod, many=True)
    return Response(serializer.data)


@api_view(['GET']) # Permet seulement les requêtes GET
def getOneProduct(request, pk):
    try :
        # Trouve le produit par son ID (pk)
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        # Si le produit n'existe pas, renvoie une erreur 404
        raise Http404("Le produit demandé n'existe pas.")

    # Sérialise les données du produit
    serializer = ProductSerializer(product)
    # Renvoie la réponse avec les données sérialisées
    return Response(serializer.data)

@api_view(['GET'])
def getCategoryProduct(request , cat):
    print('--------------------------------------------------',cat)
    try:
        # Rechercher la catégorie par son nom
        category = Category.objects.get(name=cat)
    except Category.DoesNotExist:
        # Si la catégorie n'existe pas, renvoyer une réponse d'erreur
        return Response({'error': 'La catégorie demandée n\'a pas été trouvée.'}, status=404)
    
    # Récupérer tous les produits associés à la catégorie trouvée
    products = Product.objects.filter(category=category)
    
    
   
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET']) #We created a private route
def getOrder(request):
    order = Order.objects.all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)

@api_view(['GET']) #We created a private route
@permission_classes([IsAuthenticated]) #User has to be authenticated
def getProfile(request):
    user = request.user
    serializer = ProfileSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = request.data
        try:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data['firstName'],  # Save first name
                last_name=data['lastName']
            )
            user.save()
            # Log in the user after signup
            user = authenticate(username=data['username'], password=data['password'])
            if user is not None:
                login(request, user)
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
#Cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    data = request.data
    try:
        product_id = data['product_id']
        quantity = data.get('quantity', 1)  # Default to 1 if quantity is not provided
        product = Product.objects.get(pk=product_id)
        cart_item = CartItem.objects.create(user=user, product=product, quantity=quantity)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_quantiy(request, item_id):
    try:
        item = CartItem.objects.get(pk=item_id, user=request.user)
        quantity = request.data.get('quantity')
        if quantity is not None:
            item.quantity = quantity
            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data)
        else:
            return Response({'error': 'Quantity is required'}, status=400)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(pk=item_id, user=request.user)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_quantity_from_cart(request, item_id):
    try:
        item = CartItem.objects.get(pk=item_id, user=request.user)
        quantity = request.data.get('quantity')
        if quantity is not None:
            item.quantity = max(1, quantity)  # Ensure quantity is not less than 1
            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data)
        else:
            return Response({'error': 'Quantity is required'}, status=400)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        formData = request.data.get('userData')

        name = formData.get('name')
        address = formData.get('address')
        phone_number = formData.get('phone')

        # Validate form data
        if not (name and address and phone_number):
            return Response({'error': 'Please provide name, address, and phone number.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the order
        order = Order.objects.create(
            user=user,
            total_amount=0,
            name=name,
            address=address,
            phone_number=phone_number
        )

        # Create order items from cart items
        total_amount = 0
        for cart_item in cart_items:
            order_item = OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price*cart_item.quantity
            )
            total_amount += order_item.price

        # Update order total amount
        order.total_amount = total_amount
        order.save()

        # Delete cart items
        cart_items.delete()

        # Serialize and return the order
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detailsOld(request):
    try:
        user = request.user
        order = Order.objects.filter(user=user).latest('created_at')
        order_items = OrderItem.objects.filter(order=order)
        order_data = OrderSerializer(order).data
        # Retrieve product names for each order item
        order_data['items'] = []
        for order_item in order_items:
            order_data['items'].append({
                'product_name': order_item.product.name,
                'quantity': order_item.quantity,
                'price': order_item.price,
            })
        return Response(order_data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_details(request):
    try:
        user = request.user
        order = Order.objects.filter(user=user).latest('created_at')
        order_items = OrderItem.objects.filter(order=order)
        order_data = OrderSerializer(order).data
        
        # Retrieve product details for each order item
        order_data['items'] = []
        for order_item in order_items:
            product = order_item.product
            product_data = {
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'quantity': order_item.quantity,
                'subtotal': order_item.quantity * order_item.price,
                'image': str(product.image),  # Convert image to string for serialization
                'category': product.category.name
            }
            order_data['items'].append(product_data)

        return Response(order_data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile_serializer = ProfileSerializer(user, data=request.data, partial=True)
    user_serializer = UserUpdateSerializer(user, data=request.data, partial=True)

    if profile_serializer.is_valid() and user_serializer.is_valid():
        profile_serializer.save()
        user_serializer.save()
        return Response(profile_serializer.data, status=status.HTTP_200_OK)
    return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)