from django.core.management.base import BaseCommand
from cars.models import Car, CarImage

class Command(BaseCommand):
    help = 'Identify cars with legacy local image paths that are likely broken'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Checking for legacy image paths...'))
        
        # Check main images
        for car in Car.objects.all():
            main_image_str = str(car.main_image)
            if 'car_images/' in main_image_str and '/' in main_image_str:
                 self.stdout.write(self.style.WARNING(f'Car ID {car.id} ("{car.name}") has legacy main image: {main_image_str}'))

        # Check additional images
        for img in CarImage.objects.all():
            img_str = str(img.image)
            if 'car_images/' in img_str and '/' in img_str:
                self.stdout.write(self.style.WARNING(f'CarImage ID {img.id} (Car: "{img.car.name}") has legacy image: {img_str}'))

        self.stdout.write(self.style.SUCCESS('\nDone. Please re-upload these images via Django Admin to fix them.'))
