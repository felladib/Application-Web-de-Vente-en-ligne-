from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('catalog/', views.getProducts),
    # path pour recuperer un produit données
    path('product/<int:pk>',views.getOneProduct),
    path('product/categorie/<str:cat>',views.getCategoryProduct),
    
    path('profile/', views.getProfile),
    path('profile/update-profile/', views.update_profile),

    path('signup/', views.signup),

    path('cart/', views.get_cart_items),
    path('add-to-cart/', views.add_to_cart),
    path('update-cartProduct-quantity/<int:item_id>', views.update_quantiy),
    path('delete-from-cart/<int:item_id>', views.delete_cart_item),
    path('cart/update-quantity-from-cart/<int:item_id>', views.update_quantity_from_cart),
    
    path('create-order/', views.create_order),
    path('order-details/', views.order_details),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]