from django.db import models
from django.contrib.auth.models import User
from django.db.models import BigAutoField, Manager
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from data.models import DataCollection

class ResearchProject(models.Model):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]
    
    PROJECT_TYPE_CHOICES = [
        ('research', 'Research'),
        ('development', 'Development'),
        ('analysis', 'Analysis'),
        ('other', 'Other'),
    ]
    
    id: BigAutoField = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES, default='research')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to='project_files/', null=True, blank=True)
    data_collections: Manager['DataCollection']

    def __str__(self):
        return self.title
   
