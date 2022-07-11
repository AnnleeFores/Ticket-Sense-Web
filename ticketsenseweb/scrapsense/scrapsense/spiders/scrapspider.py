import scrapy
from scrapy_playwright.page import PageMethod
from dateutil import parser


# playwright integration for js website  Note: Make sure to edit settings.py to include playwright
# spider for ticketnew website
class tkSpider(scrapy.Spider):
    name = 'tk'
    
    def start_requests(self):
        
        yield scrapy.Request(
            url=f'https://www.ticketnew.com/{self.link}',
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', 'div.tn-entity-details')
                ]
            ))

    async def parse(self, response):

        # values accessed from get url
        film = self.film
        date = self.date

        ## if date booking is active get the details
        active = response.css('li.ui-tabs-tab.ui-corner-top.ui-state-default.ui-tab.ui-tabs-active.ui-state-active').get()

        # logic to check and retrive only the needed data in json format
        if active != None:
            venuehtml =  response.css('div#divTheatreInfo')
            DT = (parser.parse(date)).strftime('%Y-%m-%d')
            for show in response.css('div.tn-entity-details')[1:]:
                showname = show.css('h5::text').get()
                if film in showname.lower():
                    yield {
                        'venue' : venuehtml.css('h2::text').get(),
                        'show' : showname,
                        'date' : DT,
                    }
        else: 
            yield {
                None
            }

# spider for bookmyshow website
class bmsSpider(scrapy.Spider):
    name = 'bms'

    def start_requests(self):
        yield scrapy.Request(
            url=f'https://in.bookmyshow.com/buytickets/{self.link}',
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', 'ul#showEvents')
                ]
            ))

    async def parse(self, response):

        film = self.film
        date = self.date

        ## if date booking is active get the details
        active = response.css('li.slick-current').get()

        if active != None:
            venuehtml =  response.css('a.venue-heading')

            date_numeric = response.css('div.date-numeric::text').get()
            date_month = response.css('div.date-month::text').get()

            DT = (parser.parse(f'{date_month} {date_numeric} 2020')).strftime('%Y-%m-%d')
            if DT == date:
                for show in response.css('a.nameSpan'):
                    showname = show.css('a::text').get()
                    if film in showname.lower():
                        yield {
                            'venue' : venuehtml.css('a::text').get(),
                            'show' : showname,
                            'date' : DT,
                        }
            else:
                yield {
                    None
                }
