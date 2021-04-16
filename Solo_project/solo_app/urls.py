from django.urls import path
from . import views

urlpatterns = [
    path('', views.smoke),
    path('main_page', views.main_page),
]