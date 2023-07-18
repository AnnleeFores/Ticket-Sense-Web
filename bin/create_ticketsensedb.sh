#! /usr/bin/bash

export $(grep -v '^#' .env | xargs)

psql postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$DB_HOST:$DB_PORT -c "create database ticketsensedb;"

