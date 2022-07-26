from rest_framework.serializers import ModelSerializer
from .models import Trigger, TktnewData

class TriggerSerializer(ModelSerializer):
    class Meta:
        model = Trigger
        fields = '__all__'
        
class TktnewDataSerializer(ModelSerializer):
    class Meta:
        model = TktnewData
        fields = '__all__'