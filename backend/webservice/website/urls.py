
from . import views

from django.urls import path
from .views import serve_image

urlpatterns = [
    path('serve_image/<str:image_path>', serve_image, name='serve_image'),
    # Vos autres URL ici...
]