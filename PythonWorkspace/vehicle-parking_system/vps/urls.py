from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),            # Admin panel URL
    path('', include('vehicle.urls')),          # Include URLs from 'vehicle' app
]
