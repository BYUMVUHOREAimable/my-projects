from django.db import models
from project.models import ResearchProject
from django.contrib.auth.models import User
from django.db.models import Model, BigAutoField

class DataCollection(Model):
    id: BigAutoField = models.BigAutoField(primary_key=True)
    project = models.ForeignKey(
        ResearchProject,
        related_name='data_collections',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True
    )
    data = models.FileField(upload_to='data_collections/')
    data_submission_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"Data Collection for {self.project.title}"