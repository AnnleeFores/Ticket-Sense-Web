from celery import shared_task
from celery.utils.log import get_task_logger
import requests


logger = get_task_logger(__name__)

name = 'tk'
link = 'INOX-Atria-Mall-Worli-Mumbai-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12319/20220712'
filmkeyword = 'love'
date = '2022-07-12'


@shared_task()
def thirty_second_func():
    response = (requests.get(f'http://127.0.0.1:9080/crawl.json?spider_name={name}&start_requests=true&crawl_args={{"link":"{link}","film":"{filmkeyword}","date":"{date}"}}').json())
    try:
        data = response['items']
    except:
        data = ''
    
    if data != []:
        for i in data:
            logger.info(i['venue'])
            logger.info(i['show'])
            logger.info(i['date'])
    return 'Done'