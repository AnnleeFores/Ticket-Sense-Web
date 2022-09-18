import scrapy
from dateutil import parser
from thefuzz import fuzz
import os
import sys

# Local
# path = os.getcwd()
# sys.path.append(os.path.dirname(path)) # add working dir to path

# Prod
path = os.getcwd()
sys.path.append((path)) # add working dir to path

from stringMatching import stripDown

# spider for ticketnew websited
class tkSpider(scrapy.Spider):

    name = 'tk'
    
    def start_requests(self):
        
        yield scrapy.Request(
            url=f'{self.link}'
            )

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
                filmkeyword_val = stripDown(film)
                film_val = stripDown(showname.lower())
                fuzz_value = fuzz.token_set_ratio(filmkeyword_val, film_val)
                print(fuzz_value)
                if fuzz_value >= 65:  # a threshold value based on Levenshtein distance comparison of 2 strings. Make changes to threshold value to work as you needed
                    yield {
                        'venue' : venuehtml.css('h2::text').get(),
                        'show' : showname,
                        'date' : DT,
                    }
        else: 
            yield {
                None
            }


# spider for sourcing ticketnew booking links and theater lists
class tkdataSpider(scrapy.Spider):
    name = 'tkdata'
    
    def start_requests(self):
        
        yield scrapy.Request(
            url=f'https://www.ticketnew.com/online-advance-booking/Theatres/C/{self.location}',
            )

    async def parse(self, response):
   
        for elem in response.css('div.tn-entity'):
            venuename = elem.css('div.tn-entity-details')
            bookinglink = elem.css('div.tn-entity-book')
            yield {
                'value' : venuename.css('h5::text').get(),
                'bookinglink' : bookinglink.css('a').attrib['href'],
            }
