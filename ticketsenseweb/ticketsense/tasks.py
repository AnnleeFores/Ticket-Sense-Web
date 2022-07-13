from codecs import ignore_errors
from celery import shared_task
from celery.utils.log import get_task_logger
import requests
from .models import Trigger
from dateutil import parser

# os module used for getting env variables
import os
# telegram module to interact with telegram chat app
import telebot
# used to source data from .env
from dotenv import load_dotenv

from time import sleep


logger = get_task_logger(__name__)

# loads dotenv to collect data from .env
load_dotenv()

# assigns value collected from .env to variables
API_KEY_TEST = os.getenv('API_KEY_TEST')
API_KEY = os.getenv('API_KEY')


# code to initialize telegram bot function
bot = telebot.TeleBot(API_KEY)
@shared_task(ignore_result=True)
def message(msg, pk, USER_ID):
    # trigger = Trigger.objects.get(id=pk)
    # trigger.delete()
    bot.send_message(USER_ID, msg, parse_mode= 'Markdown')
    # for i in range(3):
    #     bot.send_message(USER_ID, msg, parse_mode= 'Markdown')
    #     sleep(60)
    

# testbot = telebot.TeleBot(API_KEY_TEST)
# def testmessage(msg):
#     testbot.send_message(USER_ID, msg)

    
@shared_task(ignore_result=True)
def five_min_func():

    try:
        triggers = Trigger.objects.all()

        for trigger in triggers:
            pk = trigger.id
            link = trigger.link
            filmkeyword = trigger.film
            date = (trigger.date).strftime('%Y-%m-%d')
            site = trigger.site
            USER_ID = trigger.tg_user_id
            fetch.delay(link, filmkeyword, date, site, pk, USER_ID)
    except:
        pass

        

@shared_task(ignore_result=True)
def fetch(link, filmkeyword, date, site, pk, USER_ID):
    
    response = (requests.get(f'http://127.0.0.1:9080/crawl.json?spider_name={site}&start_requests=true&crawl_args={{"link":"{link}","film":"{filmkeyword}","date":"{date}"}}').json())
    try:
        data = response['items']
    except:
        data = ''

    logger.info(data)
    if data != []:
        for i in data:
            film = i['show']
            venue = i['venue']
            date = (parser.parse(i['date'])).strftime('%d-%m-%Y')

            if site == 'bms':
                websitelink = f'https://in.bookmyshow.com/buytickets/{link}'
            else:
                websitelink = f'https://www.ticketnew.com/{link}'

            #* * to make text bold for telegram based on markdown parsing
            msg = f""" *Ticket Sense* found ticket booking for:

*{film}*
            
📍 {venue}

🗓️ {date}

Link: {websitelink} """  

            message.delay(msg, pk, USER_ID)

    return 'done'
