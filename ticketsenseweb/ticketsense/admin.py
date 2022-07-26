from django.contrib import admin
from .models import User, Trigger, TktnewData


class TriggerAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "link", "film", "date", "tg_user_id", "site")
class TktnewDataAdmin(admin.ModelAdmin):
    list_display = ("id", "location", "data")

# Register your models here.
admin.site.register(User)
admin.site.register(Trigger, TriggerAdmin)
admin.site.register(TktnewData, TktnewDataAdmin)

