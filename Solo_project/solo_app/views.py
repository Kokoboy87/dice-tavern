from django.shortcuts import render, redirect

def smoke(request):
    return render(request, 'smoke.html')

def main_page(request):
    return render(request, 'glowing.html')

# Create your views here.
