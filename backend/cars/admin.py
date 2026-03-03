from django.contrib import admin
from .models import Car, CarImage

class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 3

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'price', 'created_at')
    search_fields = ('name', 'year')
    inlines = [CarImageInline]

admin.site.register(CarImage)
