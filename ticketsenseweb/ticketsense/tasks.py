from codecs import ignore_errors
from celery import shared_task
from celery.utils.log import get_task_logger
import requests
from .models import Trigger


logger = get_task_logger(__name__)




#     link = 'INOX-Atria-Mall-Worli-Mumbai-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12319/20220712'
#     filmkeyword = 'love'
#     date = '2022-07-12'


    
@shared_task(ignore_result=True)
def five_min_func():

    triggers = Trigger.objects.all()

    for trigger in triggers:
        link = trigger.link
        filmkeyword = trigger.film
        date = (trigger.date).strftime('%Y-%m-%d')
        site = trigger.site
        fetch.delay(link, filmkeyword, date, site)

        

@shared_task(ignore_result=True)
def fetch(link, filmkeyword, date, site):
    
    response = (requests.get(f'http://127.0.0.1:9080/crawl.json?spider_name={site}&start_requests=true&crawl_args={{"link":"{link}","film":"{filmkeyword}","date":"{date}"}}').json())
    try:
        data = response['items']
    except:
        data = ''

    logger.info(data)
    # if data != []:
    #     for i in data:
    #         logger.info(i['venue'])
    #         logger.info(i['show'])
    #         logger.info(i['date'])

    return 'done'
