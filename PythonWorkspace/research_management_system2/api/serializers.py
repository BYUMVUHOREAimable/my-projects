from rest_framework import serializers
from project.models import ResearchProject
from data.models import DataCollection
from users.models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'user', 'department', 'role']

class ResearchProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = ResearchProject
        fields = '__all__'

class DataCollectionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project = ResearchProjectSerializer(read_only=True)
    
    class Meta:
        model = DataCollection
        fields = '__all__' 