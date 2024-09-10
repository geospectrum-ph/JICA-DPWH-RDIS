#!/bin/sh
if [ "$DB_ENGINE" = "mssql" ]
then
    echo "Waiting for $DB_HOST... $DB_HOST $DB_PORT;"

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

fi
echo "MSSQL started"
sleep 60
npx sequelize-cli db:migrate
exec "$@"