import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta
import random
from project.models import ResearchProject
from django.contrib.auth.models import User

fake = Faker()

def generate_sample_data(n_rows=500000):
    """Generate sample research project data"""
    
    data = {
        'title': [],
        'description': [],
        'created_at': [],
        'updated_at': [],
        'status': [],
        'project_type': [],
        'priority': [],
        'start_date': [],
        'end_date': [],
        'due_date': [],
        'budget': [],
        'created_by_id': []
    }
    
    status_choices = ['planning', 'active', 'on_hold', 'completed']
    project_types = ['research', 'development', 'analysis', 'other']
    priority_levels = ['low', 'medium', 'high']
    
    # Get list of user IDs from database
    user_ids = list(User.objects.values_list('id', flat=True))
    
    for _ in range(n_rows):
        start_date = fake.date_between(start_date='-2y', end_date='today')
        end_date = fake.date_between(start_date=start_date, end_date='+1y')
        
        data['title'].append(fake.catch_phrase())
        data['description'].append(fake.text())
        data['created_at'].append(fake.date_time_between(start_date='-2y'))
        data['updated_at'].append(fake.date_time_between(start_date='-1y'))
        data['status'].append(random.choice(status_choices))
        data['project_type'].append(random.choice(project_types))
        data['priority'].append(random.choice(priority_levels))
        data['start_date'].append(start_date)
        data['end_date'].append(end_date)
        data['due_date'].append(fake.date_between(start_date=start_date, end_date=end_date))
        data['budget'].append(random.uniform(1000, 1000000))
        data['created_by_id'].append(random.choice(user_ids))
    
    return pd.DataFrame(data)

def process_dataset(df):
    """Process the dataset and handle null values"""
    
    # Handle null values
    df['budget'].fillna(df['budget'].mean(), inplace=True)
    df['description'].fillna('No description available', inplace=True)
    df['due_date'].fillna(df['end_date'], inplace=True)
    
    # Add new features
    df['duration_days'] = (pd.to_datetime(df['end_date']) - pd.to_datetime(df['start_date'])).dt.days
    df['days_to_due'] = (pd.to_datetime(df['due_date']) - pd.to_datetime(df['created_at'])).dt.days
    df['is_overdue'] = df.apply(lambda x: x['due_date'] < datetime.now().date() if pd.notnull(x['due_date']) else False, axis=1)
    df['budget_category'] = pd.qcut(df['budget'], q=4, labels=['low', 'medium', 'high', 'very_high'])
    
    return df

def get_dataset_description(df):
    """Get detailed description of the dataset"""
    
    description = {
        'basic_info': {
            'rows': len(df),
            'columns': len(df.columns),
            'memory_usage': df.memory_usage(deep=True).sum() / 1024**2,  # in MB
        },
        'null_counts': df.isnull().sum().to_dict(),
        'data_types': df.dtypes.to_dict(),
        'numerical_stats': df.describe().to_dict(),
        'categorical_stats': {
            col: df[col].value_counts().to_dict() 
            for col in ['status', 'project_type', 'priority', 'budget_category']
        }
    }
    
    return description 