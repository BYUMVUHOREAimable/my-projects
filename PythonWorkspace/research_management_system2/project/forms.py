from django import forms
from .models import ResearchProject

class ProjectForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2',
            'placeholder': 'Enter project title'
        })
    )
    
    description = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2',
            'rows': 4,
            'placeholder': 'Enter project description'
        })
    )
    
    start_date = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2'
        })
    )
    
    end_date = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2'
        })
    )
    
    due_date = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2'
        })
    )
    
    status = forms.ChoiceField(
        choices=ResearchProject.STATUS_CHOICES,
        widget=forms.Select(attrs={
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2'
        })
    )
    
    project_type = forms.ChoiceField(
        choices=ResearchProject.PROJECT_TYPE_CHOICES,
        widget=forms.Select(attrs={
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2'
        })
    )
    
    file = forms.FileField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2',
            'accept': '.pdf,.doc,.docx,.txt,.csv'
        })
    )

    class Meta:
        model = ResearchProject
        fields = ['title', 'description', 'status', 'project_type', 
                 'start_date', 'end_date', 'due_date', 'file']

    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')
        due_date = cleaned_data.get('due_date')

        if start_date and end_date and end_date < start_date:
            raise forms.ValidationError("End date cannot be before start date.")
            
        if start_date and due_date and due_date < start_date:
            raise forms.ValidationError("Due date cannot be before start date.")

        return cleaned_data
      
