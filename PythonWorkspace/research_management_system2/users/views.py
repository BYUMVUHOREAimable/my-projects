from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from django.contrib import messages

User = get_user_model()

def participant_list(request):
    participants = User.objects.all()
    return render(request, 'users/participant_list.html', {'participants': participants})

def participant_detail(request, pk):
    participant = get_object_or_404(User, pk=pk)
    return render(request, 'users/participant_detail.html', {'participant': participant})

def participant_create(request):
    # Add your creation logic here
    return render(request, 'users/participant_form.html')

def participant_update(request, pk):
    participant = get_object_or_404(User, pk=pk)
    # Add your update logic here
    return render(request, 'users/participant_form.html', {'participant': participant})

def participant_delete(request, pk):
    participant = get_object_or_404(User, pk=pk)
    # Add your deletion logic here
    return redirect('participant_list')

def signup(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Redirect to home after successful login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')

# Add login_required decorator to views that need authentication
@login_required
def projects(request):  # Example protected view
    return render(request, 'projects.html')

@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'users/profile.html', context)
