from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('website.urls')),
    path('api/', include('website.api.urls'))
    # Ajoutez la ligne suivante pour servir les fichiers media pendant le développement
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)#
