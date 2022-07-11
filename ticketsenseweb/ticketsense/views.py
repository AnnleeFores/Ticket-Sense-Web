from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trigger
from .serializers import TriggerSerializer

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
    response = (requests.get('http://127.0.0.1:9080/crawl.json?spider_name=tk&start_requests=true&crawl_args={"link":"Liberty-Paradise-Complex--Thalassery-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/1203/20220711","film":"thor","date":"2020-07-11"}').json())
    data = response['items'][0]
    print(data)
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

