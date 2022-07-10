from django.contrib import admin
from .models import User, Trigger


class TriggerAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "link", "film", "date")

# Register your models here.
admin.site.register(User)
admin.site.register(Trigger, TriggerAdmin)

