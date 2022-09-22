# [Ticket Sense](https://ticketsense.annleefores.com/)

A web app to get notified about ticket sales at your preferred theater before anyone else.

Works by periodically crawling through site to collect required data.

Currently works only with theaters listed on BookMyShow and TicketNew

---

### Made with

[Backend](https://github.com/AnnleeFores/Ticket-Sense-Web): Django, Django REST framework, Celery, Scrapy, ScrapyRT, Redis, pyTelegramBotAPI, PostgreSQL, Cloudscraper

[Frontend](https://github.com/AnnleeFores/Ticket-Sense-Web-Frontend): Next.js, Mantine UI, Tailwind CSS

Frontend deployed on Vercel
Backend deployed on DigitalOcean droplet


---

### Usage

Redis serber

```
redis-server
```

Django application

```
cd ticketsenseweb && python3 manage.py makemigrations && python3 manage.py runserver
```

Celery

```
celery -A ticketsenseweb.celery beat -l INFO
```

```
celery -A ticketsenseweb worker -l info -n a1
```

Scrapy

```
cd scrapsense && scrapyrt
```
