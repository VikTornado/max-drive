from django.db import models

class Car(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    main_image = models.ImageField(upload_to='car_images/')
    
    # Localized descriptions
    description_en = models.TextField(blank=True)
    description_de = models.TextField(blank=True)
    
    # Localized specifications
    specs_en = models.TextField(blank=True)
    specs_de = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.year})"

class CarImage(models.Model):
    car = models.ForeignKey(Car, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='car_images/additional/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.car.name}"
