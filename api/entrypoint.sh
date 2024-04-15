#!/bin/sh
if [ "$PGDATABASE" = "postgres" ]
then
    echo "Waiting for postgres... $PGHOST $PGPORT;"

    while ! nc -z $PGHOST $PGPORT; do
      sleep 0.1
    done

fi
echo "PostgreSQL started"
exec "$@"