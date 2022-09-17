# [Ticket Sense](https://ticketsense.annleefores.com/)

A web app to get notified about ticket sales at your preferred theater before anyone else.
Currently works only with theaters listed on BookMyShow and TicketNew

---

#### Made with

[Backend](https://github.com/AnnleeFores/Ticket-Sense-Web): Django, Django REST framework, Celery, Scrapy, ScrapyRT, Redis, pyTelegramBotAPI, PostgreSQL

[Frontend](https://github.com/AnnleeFores/Ticket-Sense-Web-Frontend): Next.js, Mantine UI, Tailwind CSS

---

`python3 -m venv venv` \
`source venv/bin/activate`

```
redis-server
```

```
cd ticketsenseweb && python3 manage.py makemigrations && python3 manage.py runserver
```

```
celery -A ticketsenseweb.celery beat -l INFO
```

```
celery -A ticketsenseweb worker -l info -n a1
```

```
cd scrapsense && scrapyrt
```
