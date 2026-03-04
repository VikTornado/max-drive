from django.contrib.auth import logout
from django.shortcuts import redirect
from django.conf import settings
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Car, ContactMessage
from .serializers import CarSerializer, ContactMessageSerializer

@api_view(['GET'])
def auth_status(request):
    return Response({
        'is_logged_in': request.user.is_authenticated and request.user.is_staff,
        'username': request.user.username if request.user.is_authenticated else None
    })

def logout_view(request):
    logout(request)
    next_url = request.GET.get('next', f"{settings.FRONTEND_URL}/")
    return redirect(next_url)

class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all().prefetch_related('images')
    serializer_class = CarSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
