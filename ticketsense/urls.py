from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("verifyuser/", views.verifyUser, name="verifyuser"),
    path("getdata/<str:pk>/", views.getData, name="getData"),
    path("trigger/", views.trigger, name="trigger"),
    path("trigger/<str:pk>/", views.single_trig, name="single_trig"),
    path("tktnew/<str:location>/", views.tktnew_theatre, name="tktnew_theatre"),
    path("bms/<str:location>/", views.bms_theatre, name="bms_theatre"),
]