from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trigger, TktnewData, TGuser
from .serializers import TriggerSerializer, TktnewDataSerializer
from .tasks import daily_func, get_tktnew_data
import requests
import re
from .telegram_auth_check import verify_telegram_authentication
import cloudscraper

import os

from dotenv import load_dotenv
scraper = cloudscraper.create_scraper()


load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
BOT_TOKEN = os.getenv('BOT_TOKEN')


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
            'Endpoint': 'api/verifyuser/',
            'method': 'POST',
            'body': None,
            'description': 'Verifies telegram user login'
        },
        {
            'Endpoint': 'api/getdata/<str:pk>/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of current userspecific triggers'
        },
        {
            'Endpoint': 'api/trigger/',
            'method': 'POST',
            'body': None,
            'description': 'Creates or updates trigger and sends updated data as response'
        },
        {
            'Endpoint': 'api/trigger/<str:pk>/',
            'method': 'GET, PUT',
            'body': None,
            'description': 'Deletes trigger and fetches single trigger'
        },
        {
            'Endpoint': 'api/tktnew/<str:location>/',
            'method': 'GET',
            'body': None,
            'description': 'API endpoint to get theater details for ticketnew based on location'
        },
     
    ]
    
    # for testing purposes only # add a monthly cron job to run this later
    # daily_func.delay()

  
    return Response(routes)

@api_view(['GET', 'POST'])
def verifyUser(request):

    if request.method == 'POST':
        data = request.data

        print(data)

        try:
            verification =  verify_telegram_authentication(BOT_TOKEN, data)
        except:
            print('the data is incorrect')
            return JsonResponse({'error':'user data is not valid', 'id': False})

        id = verification['id']
        first_name = verification['first_name']


        try:
            last_name = verification['last_name']
        except:
            last_name = ''

        try:
            username = verification['username']
        except:
            username = ''

        tguser, created =  TGuser.objects.update_or_create(id=id, first_name=first_name, last_name=last_name, username=username, defaults={'id': id})

        return JsonResponse({'message':'verified', 'id': verification['id']})


# get the list of all user specific triggers
@api_view(['GET'])
def getData(request, pk):

    if request.method == 'GET':

        tguser =  TGuser.objects.get(id=pk)

        trigger = Trigger.objects.filter(tg_user=tguser).order_by('-id')
        serializer = TriggerSerializer(trigger, many=True)
        return Response(serializer.data)


# create a new trigger
@api_view(['POST'])
def trigger(request):
    
    if request.method == 'POST':

        data = request.data
        print(data)
        if (data['film'][-13:-1]) != 'Invalid Date':
            movie = data['film'][:-7]
            release_year = data['film'][-5:-1]
        else:
            movie = data['film'][:-15]
            release_year = ''
        date = data['date']
        date_formatted = re.sub(r'-','', date)
        theater_name = data['theater']['name']
        site =  data['site']

        tg_user_id = data['tg_user_id']
        tguser = TGuser.objects.get(id=tg_user_id) # get tguser instance

        # get poster image url
        response = (requests.get(f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={movie}&page=1&include_adult=false&primary_release_year={release_year}').json())
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
            theater = re.sub(r'[/.]', '', theater_name) #remove / & .
            theater = re.sub(r'[^\w]', ' ', theater) #remove all non alphabetical character
            theater = re.sub(r"\s+", '-', theater) # replace space with -
            
            link = f'{theater.lower()}/cinema-{location_code.lower()}-{theater_code.upper()}-MT/{date_formatted}'

            trigger =  Trigger.objects.create(link=link, movie=movie, release_year=release_year, poster=poster, date=date, theater=theater_name, theater_code=theater_code, tg_user=tguser, site=site )

        else:
            extracted_link = data['theater']['link']
            link = f'{extracted_link}/{date_formatted}'
            trigger =  Trigger.objects.create(link=link, movie=movie, release_year=release_year, poster=poster, date=date, theater=theater_name, tg_user=tguser, site=site )


        return JsonResponse({'message':'success'}, safe=True)

# edit/delete delete a trigger
# edit feature to be implemented in future revisions
@api_view(['GET', 'PUT'])
def single_trig(request, pk):
    if request.method == 'GET':
        try:
            trigger = Trigger.objects.get(id=pk)
            serializer = TriggerSerializer(trigger, many=False)
            return Response(serializer.data)
        except:
            print('data not available')
            return JsonResponse({'message':'already deleted'})

    elif request.method == 'PUT':
        try:
            trigger = Trigger.objects.get(id=pk)
            trigger.delete()
            return JsonResponse({'success':'deleted'})
        except:
            print('already deleted')
            return JsonResponse({'message':'already deleted'})
        


#Get theater list for ticket new from database
@api_view(['GET'])
def tktnew_theatre(request, location):
    try:
        tktnewData = TktnewData.objects.get(location=location)
        serializer = TktnewDataSerializer(tktnewData, many=False)
        return Response(serializer.data)
    except:
        return JsonResponse({'error':'No data'})

@api_view(['GET'])
def bms_theatre(request, location):
    response = (scraper.get(f'https://in.bookmyshow.com/pwa/api/de/venues?regionCode={location}&eventType=MT')).json()   
    return Response(response)