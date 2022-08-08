from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
class User(AbstractUser):
    pass

class TGuser(models.Model):
    id = models.CharField(max_length=50 , primary_key=True)
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)


class Trigger(models.Model):
    link = models.CharField(max_length=200, null=True, blank=True)
    movie = models.CharField(max_length=200, null=True, blank=True)
    release_year = models.CharField(max_length=6, null=True, blank=True)
    poster = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    theater = models.CharField(max_length=200, null=True, blank=True)
    theater_code = models.CharField(max_length=20, null=True, blank=True)
    tg_user = models.ForeignKey(TGuser, on_delete=models.CASCADE, related_name="tg_user_id")
    site = models.CharField(max_length=200, null=True, blank=True)
    

    def __str__(self):
        return f" {self.link}, {self.movie}, {self.release_year}, {self.poster}, {self.date}, {self.theater}, {self.theater_code}, {self.tg_user}, {self.site}"

class TktnewData(models.Model):
    location = models.CharField(max_length=200, null=True, blank=True)
    data = models.JSONField(null=True)
