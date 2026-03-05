from django.contrib import admin
from .models import Car, CarImage, ContactMessage, AboutPageContent

@admin.register(AboutPageContent)
class AboutPageContentAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'updated_at')
    readonly_fields = ('updated_at',)

class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 3

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'price', 'created_at')
    search_fields = ('name', 'year')
    inlines = [CarImageInline]

admin.site.register(CarImage)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('name', 'email', 'phone', 'message')
    ordering = ('-created_at',)
