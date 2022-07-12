from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
class User(AbstractUser):
    pass


class Trigger(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
    link = models.CharField(max_length=200, null=True, blank=True)
    film = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    tg_user_id = models.CharField(max_length=200, null=True, blank=True)
    site = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.user}, {self.link}, {self.film}, {self.date}, {self.tg_user_id}, {self.site}"