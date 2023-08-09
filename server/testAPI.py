import requests
import json
from fastapi import FastAPI, HTTPException

url = "http://localhost:8000/api/segbot-segment-service"
payload = {"query": "the food is good but the service is slow", "granularity": "conjunction_words", "model": "bert_uncased", "device": "cpu"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(payload), headers=headers)

if response.status_code == 200:
    response_data = response.json()
    text_segments = response_data.get("text", [])
    print(text_segments) 
else:
    raise HTTPException(status_code=response.status_code, detail="API request failed")