from django.contrib import admin
from .models import User, Trigger, TktnewData, TGuser


class TriggerAdmin(admin.ModelAdmin):
    list_display = ("id", "link", "movie", "poster", "date", "theater", "theater_code", "tg_user", "site")

class TktnewDataAdmin(admin.ModelAdmin):
    list_display = ("id", "location", "data")
class TGuserAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "username")

# Register your models here.
admin.site.register(User)
admin.site.register(Trigger, TriggerAdmin)
admin.site.register(TktnewData, TktnewDataAdmin)
admin.site.register(TGuser, TGuserAdmin)

