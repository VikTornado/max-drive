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

class AboutPageContent(models.Model):
    title_en = models.CharField(max_length=200, default="About Our Dealership")
    title_de = models.CharField(max_length=200, default="Über unser Autohaus")
    content_en = RichTextField()
    content_de = RichTextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"About Page Content ({self.updated_at.strftime('%Y-%m-%d %H:%M')})"

    class Meta:
        verbose_name = "About Page Content"
        verbose_name_plural = "About Page Content"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

import threading

@receiver(post_save, sender=ContactMessage)
def send_contact_email(sender, instance, created, **kwargs):
    if created:
        subject = f"New Contact Request from {instance.name}"
        message = (
            f"You have received a new contact request from your website:\n\n"
            f"Name: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Phone: {instance.phone}\n"
            f"Message: {instance.message}\n\n"
            f"You can view this message in the admin panel: "
            f"{settings.FRONTEND_URL}/admin/cars/contactmessage/"
        )
        
        def _send():
            try:
                # Debug info (will be visible in Render logs)
                host_user = getattr(settings, 'EMAIL_HOST_USER', 'Not Set')
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'Not Set')
                print(f"--- EMAIL DEBUG START ---")
                print(f"Attempting to send email via host user: {host_user[:3]}***{host_user[-3:] if '@' in host_user else ''}")
                print(f"From: {from_email}")
                print(f"To: {from_email}")
                print(f"Subject: {subject}")
                
                send_mail(
                    subject,
                    message,
                    from_email,
                    [from_email],
                    fail_silently=False,
                )
                print("--- EMAIL DEBUG: SENT SUCCESS ---")
            except Exception as e:
                print(f"--- EMAIL DEBUG: CRITICAL ERROR ---")
                print(f"Error: {str(e)}")
                import traceback
                print(traceback.format_exc())

        # Send email in a background thread to avoid blocking the response
        threading.Thread(target=_send).start()
        print("Background email thread started.")
