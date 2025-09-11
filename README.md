# JICA-DPWH-RDIS
A repository of all the source code for the JICA-DPWH-RDIS project.

## Web
- The Web service is running at port `http://localhost:3000`.
## API
- The API service is running at port `http://localhost:3001`.
## Mobile
### RSM
### Hazard Map
## Infrastructure
### Requirements
- [Docker](https://docs.docker.com/get-docker/)
- docker compose

### Development Setup
- Starting the Development Server
    ```
    cd infrastructure/
    docker compose up # run with the --build flag to rebuild the container
    ```
- Stopping the Development Server
    ```
    cd infrastructure/
    docker compose down # run with -v flag to delete the contents of the database
    ```
- Update the hosts file (Windows)
   - Open the following in notepad with administrator privileges. `C:\Windows\System32\drivers\etc\hosts`
   -  Add the following entries and save.
    ```
    127.0.0.1 api.rdis.local
    127.0.0.1 web.rdis.local
    ```
## Utils
