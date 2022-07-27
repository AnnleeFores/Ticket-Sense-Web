from django.contrib import admin
from .models import User, Trigger, TktnewData


class TriggerAdmin(admin.ModelAdmin):
    list_display = ("id", "link", "movie", "poster", "date", "theater", "tg_user_id", "site")
class TktnewDataAdmin(admin.ModelAdmin):
    list_display = ("id", "location", "data")

# Register your models here.
admin.site.register(User)
admin.site.register(Trigger, TriggerAdmin)
admin.site.register(TktnewData, TktnewDataAdmin)

