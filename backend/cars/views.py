from django.contrib.auth import logout
from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer

@api_view(['GET'])
def auth_status(request):
    return Response({
        'is_logged_in': request.user.is_authenticated and request.user.is_staff,
        'username': request.user.username if request.user.is_authenticated else None
    })

def logout_view(request):
    logout(request)
    next_url = request.GET.get('next', 'http://localhost:5173/')
    return redirect(next_url)

class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all().prefetch_related('images')
    serializer_class = CarSerializer
