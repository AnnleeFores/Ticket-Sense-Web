from requests import request
import scrapy
from scrapy_playwright.page import PageCoroutine


class PwspiderSpider(scrapy.Spider):
    name = 'pwspider'
    
    def start_requests(self):
        yield scrapy.Request('https://www.ticketnew.com/Carnival-Downtown--Thalassery-Book-My-Movie-Show-Tickets/Online-Ticket-Booking/12539', 
        meta=dict(
            playwright = True,
            playwright_include_page = True,
            playwright_page_coroutines = [
                PageCoroutine('wait_for_selector', 'div.tn-entity-details')
            ]
        ))

    async def parse(self, response):
        venuehtml =  response.css('div#divTheatreInfo')
        yield {
            'venue' : venuehtml.css('h2::text').get(),
        }
        for show in response.css('div.tn-entity-details')[1:]:
            yield {
                'show' : show.css('h5::text').get(),
            }
