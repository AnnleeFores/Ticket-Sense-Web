from fileinput import filename
from requests import request
import scrapy
from scrapy_playwright.page import PageCoroutine

film = 'love'

class PwspiderSpider(scrapy.Spider):
    name = 'pwspider'
    
    def start_requests(self):
        yield scrapy.Request('https://www.ticketnew.com/INOX-Atria-Mall-Worli-Mumbai-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12319/20220710', 
        meta=dict(
            playwright = True,
            playwright_include_page = True,
            playwright_page_coroutines = [
                PageCoroutine('wait_for_selector', 'div.tn-entity-details')
            ]
        ))

    async def parse(self, response):
        ## if date booking is active get the details
        active = response.css('li.ui-tabs-tab.ui-corner-top.ui-state-default.ui-tab.ui-tabs-active.ui-state-active').get()

        if active != None:
            venuehtml =  response.css('div#divTheatreInfo')
            for show in response.css('div.tn-entity-details')[1:]:
                showname = show.css('h5::text').get()
                if film in showname.lower():
                    yield {
                        'venue' : venuehtml.css('h2::text').get(),
                        'show' : showname,
                    }