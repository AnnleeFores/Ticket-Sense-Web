from rest_framework.serializers import ModelSerializer
from .models import Trigger

class TriggerSerializer(ModelSerializer):
    class Meta:
        model = Trigger
        fields = '__all__'