from django.shortcuts import render

recipes = [
    {
        'author': 'Aimable',
        'title': 'Meatball Sub',
        'directions': 'Combine all ingredients',
        'date_posted': 'November 22, 2024'
    },
    {
        'author': 'Aimable',
        'title': 'Turkey Sub',
        'directions': 'Combine all ingredients',
        'date_posted': 'November 18, 2024'
    },
    {
        'author': 'Aimable',
        'title': 'Ham & Cheese Sub',
        'directions': 'Combine all ingredients',
        'date_posted': 'November 19, 2024'
    }
]

def home(request):
    context = {
        'recipes': recipes
    }
    return render(request, "recipes/home.html", context)

def about(request):
    return render(request, "recipes/about.html",{'title':'about us page'})
