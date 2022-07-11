#!/usr/bin/env python3


import requests

def my_scheduled_job():
    # print('ello')
    response = (requests.get('http://127.0.0.1:9080/crawl.json?spider_name=tk&start_requests=true&crawl_args={"link":"INOX-Atria-Mall-Worli-Mumbai-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12319/20220712","film":"love","date":"2020-07-11"}').json())
    try:
        data = response['items']
    except:
        data = ''
    print(data)
