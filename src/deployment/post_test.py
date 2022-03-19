import requests
import json

url = 'http://127.0.0.1:1803/enfrappe_static_update_data'
myobj = {'timestamp': '0'}

x = requests.post(url, data = json.dumps(myobj), headers={'Content-Type': 'application/json'})

print(x.json())