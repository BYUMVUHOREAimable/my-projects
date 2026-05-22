from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'department', 'role']
    search_fields = ['user__username', 'department', 'role']