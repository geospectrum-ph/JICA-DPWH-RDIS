#!/usr/bin/sh

mkdir -p /var/opt/mssql/.system
chown -R mssql:root /var/opt/mssql
/opt/mssql/bin/sqlservr &
sleep 30

echo 'Creating database and user...\nrunning create db'
/opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -Q "CREATE DATABASE ${DB_NAME};"
echo 'running create login user'
/opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -Q "USE ${DB_NAME}; CREATE LOGIN ${DB_USER} WITH PASSWORD='${DB_PASSWORD}';"
echo 'running create user'
/opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -Q "USE ${DB_NAME}; CREATE USER ${DB_USER} FOR LOGIN ${DB_USER};"
echo 'running assigning user to db'
/opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -Q "USE ${DB_NAME}; ALTER ROLE db_owner ADD MEMBER ${DB_USER};"
echo 'Database and user created successfully.'  
tail -f /dev/null
