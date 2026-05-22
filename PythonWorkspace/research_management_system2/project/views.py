from django.shortcuts import render, get_object_or_404, redirect
from project.models import ResearchProject  # Import from your project app
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.contrib.auth.decorators import login_required
from .forms import ProjectForm  # Add this with your other imports
from django.urls import reverse_lazy
from django.contrib import messages
from django.db.models.functions import TruncMonth
import json
from datetime import datetime, timedelta
from django.conf import settings
import os
from django.utils import timezone

def home(request):
    if request.user.is_authenticated:
        user_projects = ResearchProject.objects.filter(created_by=request.user)
        
        # Stats
        total_projects = user_projects.count()
        stats = {
            'active_projects': user_projects.filter(status='active').count(),
            'completed_projects': user_projects.filter(status='completed').count(),
        }
        
        # Projects over time
        projects_data = (
            user_projects.annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        
        # Status distribution
        status_data = (
            user_projects.values('status')
            .annotate(count=Count('id'))
            .order_by('status')
        )
        
        # Recent projects
        recent_projects = user_projects.order_by('-created_at')[:5]
        
        context = {
            'total_projects': total_projects,
            'stats': stats,
            'recent_projects': recent_projects,
            'projects_chart_data': {
                'labels': [entry['date'].strftime('%Y-%m-%d') for entry in projects_data],
                'data': [entry['count'] for entry in projects_data]
            },
            'status_chart_data': {
                'labels': [dict(ResearchProject.STATUS_CHOICES).get(entry['status']) for entry in status_data],
                'data': [entry['count'] for entry in status_data]
            }
        }
    else:
        context = {}
    
    return render(request, 'home.html', context)

@login_required
def project_list(request):
    # Get all projects for the logged-in user
    projects = ResearchProject.objects.filter(created_by=request.user).order_by('-created_at')
    
    context = {
        'projects': projects
    }
    
    return render(request, 'project/project_list.html', context)

def project_detail(request, pk):
    project = get_object_or_404(ResearchProject, pk=pk)
    return render(request, 'project/project_detail.html', {'project': project})

@login_required
def project_create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            project = form.save(commit=False)
            project.created_by = request.user
            project.save()
            return redirect('project_list')
    else:
        form = ProjectForm()
    
    return render(request, 'project/project_form.html', {'form': form})

def project_api_list(request):
    # Add your API logic here
    pass

@login_required
def dashboard(request):
    # Get user's projects
    user_projects = ResearchProject.objects.filter(created_by=request.user)
    
    # Basic statistics
    context = {
        'total_projects': user_projects.count(),
        'active_projects': user_projects.filter(status='active').count(),
        'completed_projects': user_projects.filter(status='completed').count(),
        'planning_projects': user_projects.filter(status='planning').count(),
        
        # Recent and upcoming projects
        'recent_projects': user_projects.order_by('-updated_at')[:5],
        'upcoming_due_dates': user_projects.filter(
            due_date__gte=timezone.now()
        ).order_by('due_date')[:5],
    }
    
    # Status chart data
    status_counts = user_projects.values('status').annotate(count=Count('id'))
    status_chart_data = {
        'labels': [status['status'] for status in status_counts],
        'data': [status['count'] for status in status_counts],
    }
    
    # Project type chart data
    type_counts = user_projects.values('project_type').annotate(count=Count('id'))
    type_chart_data = {
        'labels': [type_['project_type'] for type_ in type_counts],
        'data': [type_['count'] for type_ in type_counts],
    }
    
    # Timeline data (last 30 days)
    thirty_days_ago = timezone.now() - timedelta(days=30)
    timeline_projects = user_projects.filter(
        created_at__gte=thirty_days_ago
    ).order_by('created_at')
    
    timeline_data = {
        'labels': [(timezone.now() - timedelta(days=x)).strftime('%Y-%m-%d') 
                  for x in range(30, -1, -1)],
        'data': [0] * 31  # Initialize with zeros
    }
    
    # Count projects per day
    for project in timeline_projects:
        day_index = (timezone.now() - project.created_at).days
        if 0 <= day_index <= 30:
            timeline_data['data'][30 - day_index] += 1
    
    # Add chart data to context
    context.update({
        'status_chart_data': json.dumps(status_chart_data),
        'type_chart_data': json.dumps(type_chart_data),
        'timeline_data': json.dumps(timeline_data),
    })
    
    return render(request, 'project/dashboard.html', context)

@login_required
def project_update(request, pk):
    project = get_object_or_404(ResearchProject, pk=pk)
    if request.method == 'POST':
        form = ProjectForm(request.POST, instance=project)
        if form.is_valid():
            form.save()
            return redirect('project_list')
    else:
        form = ProjectForm(instance=project)
    
    return render(request, 'project/project_form.html', {'form': form})

def project_delete(request, pk):
    project = get_object_or_404(ResearchProject, pk=pk)
    if request.method == 'POST':
        project.delete()
        return redirect('project_list')
    return render(request, 'project/project_delete.html', {'project': project})

projects = project_list  # Add this line to create an alias