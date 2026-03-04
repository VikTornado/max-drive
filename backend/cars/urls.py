from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CarViewSet, ContactMessageViewSet, auth_status, logout_view

router = DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('auth-status/', auth_status),
    path('logout/', logout_view),
    path('', include(router.urls)),
]
