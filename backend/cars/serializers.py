from rest_framework import serializers
from .models import Car, CarImage, ContactMessage, AboutPageContent

class CarImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarImage
        fields = ['id', 'image', 'order']

    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            if url.startswith('http://'):
                url = url.replace('http://', 'https://', 1)
            return url
        return None

class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    main_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Car
        fields = [
            'id', 'name', 'year', 'price', 'main_image', 
            'description_en', 'description_de', 
            'specs_en', 'specs_de', 'images', 'created_at'
        ]

    def get_main_image(self, obj):
        if obj.main_image:
            url = obj.main_image.url
            if url.startswith('http://'):
                url = url.replace('http://', 'https://', 1)
            return url
        return None

class AboutPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageContent
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
