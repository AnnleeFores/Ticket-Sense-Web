# [Ticket Sense](https://ticketsense.app/)

Ticket Sense is a web application designed to provide early notifications about ticket sales at your preferred theater. With Ticket Sense, you can stay ahead of the crowd and secure your tickets before anyone else.

## Key Features
- **Early Ticket Notifications**: Ticket Sense periodically scans through supported theater websites, such as BookMyShow and TicketNew, to collect the necessary data. This ensures that you receive timely notifications as soon as ticket sales begin.

- **Customized Theater Preferences**: You can set your preferred theater(s) within the application. Ticket Sense will specifically monitor those theaters and notify you about upcoming ticket sales, ensuring you never miss out on your favorite shows.


## Supported Theaters

Currently, Ticket Sense works exclusively with theaters listed on BookMyShow and TicketNew. These platforms cover a wide range of theaters and events, ensuring comprehensive coverage for most popular movies and shows.

---

## Technologies Used

[Backend](https://github.com/annleefores/Ticket-Sense-Web): 
- Django
- Django REST framework 
- Celery 
- Scrapy & ScrapyRT 
- Redis 
- TMDB API
- pyTelegramBotAPI 
- PostgreSQL 
- Cloudscraper

Deployed on DigitalOcean droplet

[Frontend](https://github.com/annleefores/Ticket-Sense-Web-Frontend): 
- Next.js 
- Mantine UI 
- Tailwind CSS

Deployed on Vercel 

---

## Get Started

To get started with Ticket Sense, follow these steps:

1. Clone the repository:

```
git clone https://github.com/annleefores/Ticket-Sense-Web.git
```

2. Install the required dependencies:

```
pip install -r requirements.txt
```

3. Redis server

```
redis-server
```

4. Django application

```
cd Ticket Senseweb && python3 manage.py makemigrations && python3 manage.py runserver
```

5. Celery

```
celery -A Ticket Senseweb.celery beat -l INFO
```

```
celery -A Ticket Senseweb worker -l info -n a1
```

6. Scrapy

```
cd scrapsense && scrapyrt
```

## Contribution

If you would like to contribute to Ticket Sense, feel free to submit pull requests or open issues on the GitHub repository. Your contributions are highly appreciated and will help enhance the functionality and usability of the application.
