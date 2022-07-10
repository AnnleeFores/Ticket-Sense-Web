import scrapy
from scrapy_playwright.page import PageMethod
from dateutil import parser


film = 'thor:'

urlbms = 'https://in.bookmyshow.com/buytickets/carnival-downtown-thalassery/cinema-thay-CDTH-MT/20220711'
urltk = 'https://www.ticketnew.com/INOX-Atria-Mall-Worli-Mumbai-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12319/20220712'

class tkSpider(scrapy.Spider):
    name = 'tk'
    
    def start_requests(self):
        yield scrapy.Request(
            url=urltk, 
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', 'div.tn-entity-details')
                ]
            ))

    async def parse(self, response):
        ## if date booking is active get the details
        active = response.css('li.ui-tabs-tab.ui-corner-top.ui-state-default.ui-tab.ui-tabs-active.ui-state-active').get()

        if active != None:
            venuehtml =  response.css('div#divTheatreInfo')
            date = response.xpath('//*[@id="hdnpagecreated"]/@value').get()
            DT = parser.parse(date)
            for show in response.css('div.tn-entity-details')[1:]:
                showname = show.css('h5::text').get()
                if film in showname.lower():
                    yield {
                        'venue' : venuehtml.css('h2::text').get(),
                        'show' : showname,
                        'date' : DT.strftime('%Y-%m-%d'),
                    }

class bmsSpider(scrapy.Spider):
    name = 'bms'

    def start_requests(self):
        yield scrapy.Request(
            url= urlbms, 
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', 'ul#showEvents')
                ]
            ))

    async def parse(self, response):
        ## if date booking is active get the details
        active = response.css('li.slick-current').get()

        if active != None:
            venuehtml =  response.css('a.venue-heading')

            date_numeric = response.css('div.date-numeric::text').get()
            date_month = response.css('div.date-month::text').get()

            DT = parser.parse(f'{date_month} {date_numeric} 2020')

            for show in response.css('a.nameSpan'):
                showname = show.css('a::text').get()
                if film in showname.lower():
                    yield {
                        'venue' : venuehtml.css('a::text').get(),
                        'show' : showname,
                        'date' : DT.strftime('%Y-%m-%d'),
                    }

