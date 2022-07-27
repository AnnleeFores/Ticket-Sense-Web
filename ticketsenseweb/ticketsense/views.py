from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trigger, TktnewData
from .serializers import TriggerSerializer, TktnewDataSerializer
from .tasks import daily_func, get_tktnew_data
import requests
import re


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
    
    # daily_func.delay()
    # get_tktnew_data.delay('Calicut')
    # get_tktnew_data.delay('Peravoor')
    # get_tktnew_data.delay('Thalassery')
    
  
    return Response(routes)
    # return render(request, 'ticketsense/index.html')



@api_view(['GET', 'POST'])
def trigger(request):
    if request.method == 'GET':

        trigger = Trigger.objects.all()
        serializer = TriggerSerializer(trigger, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        data = request.data
        movie = data['film'][:-7]
        release_year = data['film'][-5:-1]
        date = data['date']
        date_formatted = re.sub(r'-','', date)
        theater = data['theater']['name']
        site =  data['site']
        tg_user_id = '378882317' #to be changed

        # get poster image url
        response = (requests.get(f'https://api.themoviedb.org/3/search/movie?api_key=00e6af3c5f4640d75b94527d05ec7098&language=en-US&query={movie}&page=1&include_adult=false&primary_release_year={release_year}').json())
        try:
            api_data = response['results']
        except:
            api_data = ''
        
        poster = ''
        for i in api_data:
            if (f'''{i['title']} ({i['release_date'][:4]})''') == data['film']:
                poster = i['poster_path']


        if site == 'bms':
            location_code = data['location']['location_code']
            theater_code = data['theater']['theater_code']
            
            # regex to create bms link
            theater = re.sub(r'[/.]', '', theater) #remove / & .
            theater = re.sub(r'[^\w]', ' ', theater) #remove all non alphabetical character
            theater = re.sub(r"\s+", '-', theater) # replace space with -
            
            link = f'{theater.lower()}/cinema-{location_code.lower()}-{theater_code.upper()}-MT/{date_formatted}'

            trigger =  Trigger.objects.create(link=link, movie=movie, release_year=release_year, poster=poster, date=date, theater=theater, tg_user_id=tg_user_id, site=site )

        else:
            extracted_link = data['theater']['link']
            link = f'{extracted_link}/{date_formatted}'
            trigger =  Trigger.objects.create(link=link, movie=movie, release_year=release_year, poster=poster, date=date, theater=theater, tg_user_id=tg_user_id, site=site )

        trigger = Trigger.objects.all()
        serializer = TriggerSerializer(trigger, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT'])
def single_trig(request, pk):
    if request.method == 'GET':
        trigger = Trigger.objects.get(id=pk)
        serializer = TriggerSerializer(trigger, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        pass

@api_view(['GET'])
def tktnew_theatre(request, location):
    try:
        tktnewData = TktnewData.objects.get(location=location)
        serializer = TktnewDataSerializer(tktnewData, many=False)
        return Response(serializer.data)
    except:
        return JsonResponse({'error':'No data'})

# helps with CORS error with browser to server when using this api
@api_view(['GET'])
def bms_theatre(request, location):
    response = (requests.get(f'https://in.bookmyshow.com/pwa/api/de/venues?regionCode={location}&eventType=MT')).json()   
    return Response(response)
    