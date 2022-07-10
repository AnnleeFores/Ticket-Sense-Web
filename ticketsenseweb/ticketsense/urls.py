from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("trigger/", views.trigger, name="trigger"),
    path("trigger/<str:pk>/", views.single_trig, name="single_trig"),
]