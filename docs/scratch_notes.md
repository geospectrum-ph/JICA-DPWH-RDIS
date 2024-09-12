
```python
import requests

def get_access_token(client_id, client_secret, url):
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': "client_credentials",
        'f': 'json'
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        print(response.text)
        return response.json()['access_token']
    else:
        raise Exception(f"Failed to obtain access token: {response.text}")

def access_rest_directory(access_token, rest_url):
    """
    Lists the layers in a given feature service.
    :param access_token: The access token obtained from get_access_token().
    :param feature_service_url: The URL of the feature service.
    """
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(rest_url, headers=headers)
    print(response.text)

# create this via interface new content > application > other application
# client_id = 'r1GhMUvYoBK3vaiT'
# client_secret = '30020848ccab4d2285fa4f6890ec098d'

# client_id = "D9TPFKDmg3S8wOon"
# client_secret = "016eea0237e44115a554f0c6f191ad2a"

client_id = "papgi1Bxx9PSWj9k"
client_secret = "f79d6dd1bdcb4d09b380917a7f74f0a5"

auth_url = "https://dpwh.maps.arcgis.com/sharing/rest/oauth2/token"
rest_url = "https://dpwh.maps.arcgis.com/sharing/rest/services"
search_url = "https://dpwh.maps.arcgis.com/sharing/rest/search?q=rdis&f=pjson"
content_url = "https://dpwh.maps.arcgis.com/sharing/rest/content/listings?q=park"
access_token = get_access_token(client_id, client_secret, auth_url)

access_rest_directory(access_token, content_url)



client_id = "o9rRQcphmgQjK0PJ"
client_secret = "c527ecc809684ec59d44e1bbd8370a5b"
main_url = "https://npmaff9c8a5066a9.maps.arcgis.com"
auth_url = f"{main_url}/sharing/rest/oauth2/token"
rest_url = f"{main_url}/sharing/rest/services"
search_url = f"{main_url}/sharing/rest/search?q=rdis&f=pjson"
content_url = f"{main_url}/sharing/rest/content/items"


access_rest_directory(access_token, content_url)

```
 


