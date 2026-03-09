from django.contrib.auth import logout
from django.shortcuts import redirect
from django.conf import settings
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Car, ContactMessage, AboutPageContent
from .serializers import CarSerializer, ContactMessageSerializer, AboutPageContentSerializer

class AboutPageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutPageContent.objects.all().order_by('-updated_at')[:1]
    serializer_class = AboutPageContentSerializer

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
    queryset = Car.objects.all().prefetch_related('images').order_by('-created_at')
    serializer_class = CarSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    authentication_classes = [] # Fix: Disable session authentication to bypass CSRF for contact form
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

@api_view(['GET'])
def test_email(request):
    import requests
    import os
    import traceback
    from django.conf import settings
    
    try:
        resend_api_key = os.getenv('RESEND_API_KEY')
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', '3809165@gmail.com')
        
        if not resend_api_key:
            return Response({
                "status": "error",
                "message": "RESEND_API_KEY is not set in environment variables."
            }, status=500)

        headers = {
            'Authorization': f'Bearer {resend_api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            "from": "Max Drive Contact <onboarding@resend.dev>",
            "to": [from_email],
            "subject": "Test Email from Max Drive",
            "text": "If you see this, the Resend Email API is working perfectly!"
        }
        
        response = requests.post('https://api.resend.com/emails', headers=headers, json=data)
        response.raise_for_status()
        
        return Response({
            "status": "success", 
            "message": f"Email sent via Resend to {from_email}",
            "resend_response": response.json()
        })
    except Exception as e:
        return Response({
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }, status=500)
