from rest_framework import serializers
from .models import Car, CarImage

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['id', 'image', 'order']

class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Car
        fields = [
            'id', 'name', 'year', 'price', 'main_image', 
            'description_en', 'description_de', 
            'specs_en', 'specs_de', 'images', 'created_at'
        ]
