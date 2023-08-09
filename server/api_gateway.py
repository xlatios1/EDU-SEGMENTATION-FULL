import json
import requests
from fastapi import FastAPI, Path
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

SERVER_URL = "http://127.0.0.1:7999/api/"

app = FastAPI()
# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

# Serve raw data
@app.get("/api/rest-raw-data/{id}")
def get_raw_data(id: int = Path(..., description="The raw data file ID")):
    url = SERVER_URL + f"rest-raw-data/{id}"
    response = requests.get(url)
    return response.json()

# Forward request to the main back end service
@app.post("/api/analyze-rest-review")
def analyze_rest_review(*, payload: dict):
    url = SERVER_URL + "analyze-rest-review"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# Segment user review
@app.post("/api/segment-rest-review")
def segment_rest_review(*, payload: dict):
    print('try')
    url = SERVER_URL + "segment-rest-review"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    segs_response = response.json()
    return segs_response

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=4000)
