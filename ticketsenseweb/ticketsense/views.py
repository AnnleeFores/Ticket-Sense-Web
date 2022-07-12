import imp
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trigger
from .serializers import TriggerSerializer

from .tasks import sleepy

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
    sleepy.delay(10)
    
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

