from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

admin.site.site_url = settings.FRONTEND_URL

from django.shortcuts import redirect
from django.urls import reverse

def custom_admin_login(request, *args, **kwargs):
    # If the user is already authenticated and is staff, redirect them to the frontend
    if request.user.is_authenticated and request.user.is_staff:
        # Check if they are trying to access a specific page inside admin (other than index)
        next_url = request.GET.get('next')
        if not next_url or next_url == reverse('admin:index'):
             return redirect(f"{settings.FRONTEND_URL}/?loggedin=true")
    
    # Store the original response
    response = admin.site.login(request, *args, **kwargs)
    
    # Check if login was successful in this specific request (POST -> redirect means success usually)
    if request.method == 'POST' and response.status_code == 302:
        if request.user.is_authenticated and request.user.is_staff:
             next_url = request.GET.get('next')
             if not next_url or next_url == reverse('admin:index'):
                 return redirect(f"{settings.FRONTEND_URL}/?loggedin=true")
                 
    return response

urlpatterns = [
    path('', RedirectView.as_view(url='admin/', permanent=False)),
    path('admin/login/', custom_admin_login),
    path('admin/', admin.site.urls),
    path('api/', include('cars.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
