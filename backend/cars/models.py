from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField

class Car(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    main_image = CloudinaryField('image')
    
    # Localized descriptions
    description_en = RichTextField(blank=True)
    description_de = RichTextField(blank=True)
    
    # Localized specifications
    specs_en = RichTextField(blank=True)
    specs_de = RichTextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.year})"

class CarImage(models.Model):
    car = models.ForeignKey(Car, related_name='images', on_delete=models.CASCADE)
    image = CloudinaryField('image')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.car.name}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
