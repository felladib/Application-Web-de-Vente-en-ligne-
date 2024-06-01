from http.client import HTTPResponse
from django.shortcuts import render, redirect


from django.http import FileResponse
from django.conf import settings
import os

def serve_image(request, image_path):
    image_full_path = os.path.join(settings.MEDIA_ROOT, image_path)
    if os.path.exists(image_full_path):
        return FileResponse(open(image_full_path, 'rb'), content_type='image/png')  # Adapter le type MIME selon le type d'image
    else:
        return HTTPResponse(status=404)