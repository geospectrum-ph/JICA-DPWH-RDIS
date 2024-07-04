# JICA-DPWH-RDIS
A repository of all the source code for the JICA-DPWH-RDIS project.

## Web
- The Web service is running at port `3000`.
## API
- The API service is running at port `3001`.
## Mobile
### RSM
### Hazard Map
## Infrastructure
### Requirements
- [Docker](https://docs.docker.com/get-docker/)
- docker compose

### Development Setup
1. Starting the Development Server
```
cd infrastructure/
docker compose up # run with the --build flag to rebuild the container
```
2. Stopping the Development Server
```
cd infrastructure/
docker compose down # run with -v flag to delete the contents of the database
```

## Utils

