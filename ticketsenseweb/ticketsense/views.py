from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trigger
from .serializers import TriggerSerializer
from .tasks import five_min_func
from allauth.account.signals import user_logged_in
from django.contrib.auth import get_user_model

User =  get_user_model()

def user_logged_in_receiver(request, user, **kwargs):
    print(request)
    print(user)

user_logged_in.connect(user_logged_in_receiver, sender=User)

# Create your views here.
@api_view(['GET'])
def index(request):

    routes = [
        {
            'Endpoint': '/index/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of current triggers'
        },

        {
            'Endpoint': '/index/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new trigger with data sent in post request'
        },
        {
            'Endpoint': '/index/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'updates an existing trigger with data sent in post request'
        },
        {
            'Endpoint': '/index/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes trigger'
        },
    ]
    
    
    return Response(routes)

@api_view(['GET'])
def trigger(request):
    trigger = Trigger.objects.all()
    serializer = TriggerSerializer(trigger, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def single_trig(request, pk):
    trigger = Trigger.objects.get(id=pk)
    serializer = TriggerSerializer(trigger, many=False)
    return Response(serializer.data)

