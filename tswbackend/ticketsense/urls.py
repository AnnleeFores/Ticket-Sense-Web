from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("api/verifyuser/", views.verifyUser, name="verifyuser"),
    path("api/getdata/<str:pk>/", views.getData, name="getData"),
    path("api/trigger/", views.trigger, name="trigger"),
    path("api/trigger/<str:pk>/", views.single_trig, name="single_trig"),
    path("api/tktnew/<str:location>/", views.tktnew_theatre, name="tktnew_theatre"),
    path("api/bms/<str:location>/", views.bms_theatre, name="bms_theatre"),
]