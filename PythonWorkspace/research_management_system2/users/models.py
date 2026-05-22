from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    ROLE_CHOICES = [
        ('researcher', 'Researcher'),
        ('supervisor', 'Supervisor'),
        ('admin', 'Administrator'),
    ]

    DEPARTMENT_CHOICES = [
        ('cs', 'Computer Science'),
        ('eng', 'Engineering'),
        ('sci', 'Science'),
        ('med', 'Medical'),
        ('other', 'Other'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default='other')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='researcher')
    

    def __str__(self):
        return f'{self.user.username} Profile'


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.profile.save()
