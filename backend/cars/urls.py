from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CarViewSet, ContactMessageViewSet, AboutPageContentViewSet, auth_status, logout_view, test_email

router = DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'about', AboutPageContentViewSet)

urlpatterns = [
    path('auth-status/', auth_status),
    path('logout/', logout_view),
    path('test-email/', test_email),
    path('', include(router.urls)),
]
