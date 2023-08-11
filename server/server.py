import os
import json
from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel
import requests
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import util


SEGBOT_URL = "http://localhost:8001/api/"
EDU_URL = "http://localhost:5002/api/"

class InputText(BaseModel):
    text: str
    granularity: str
    model: str
    device: str
    conjunctions: str


app = FastAPI()
# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)


# Serve raw data
@app.get("/api/rest-raw-data/{id}")
def get_raw_data(id: int):
    file_paths = {
        1: "data/rest_han_reg.raw",
        2: "data/rest_han_reg_v2.raw",
    }

    file_path = file_paths.get(id)
    if file_path:
        json_string = util.convert_to_json_from_path(file_path)
        return json_string
    else:
        raise HTTPException(status_code=404, detail="Raw data file not found")

# Take in user review, segment it, run it through the EDU classifier, and return the result
@app.post("/api/analyze-rest-review")
def analyze_text(input_text: InputText = Body(...)):
    seg_url = SEGBOT_URL + "segbot-segment-service"
    payload = {"text": input_text.text, 
               "granularity": input_text.granularity, 
               "model": input_text.model,
               "device": input_text.device,
               "conjunctions": input_text.conjunctions}
    headers = {"Content-Type": "application/json"}

    seg_response = requests.post(seg_url, data=json.dumps(payload), headers=headers)

    if seg_response.status_code == 200:
        seg_data = seg_response.json()
        edu_url = EDU_URL + "edu-sentiment-analysis-service"
        merge_ls = []
        for ls in seg_data['segs']:
            part = " ".join(ls)
            merge_ls.append(part)
        seg_data['segs'] = merge_ls
        edu_payload = seg_data
        edu_response = requests.post(edu_url, data=json.dumps(edu_payload), headers=headers)


        if edu_response.status_code == 200:
            edu_data = edu_response.json()
            result = edu_data
            result_json_string = util.convert_to_json(result)
            return result_json_string
        else:
            raise HTTPException(status_code=edu_response.status_code, detail="EDU analysis API request failed")
    else:
        raise HTTPException(status_code=seg_response.status_code, detail="Segmentation API request failed")

# Take in user review, segment it, and return the segments
@app.post("/api/segment-rest-review")
def segment_text(input_text: InputText = Body(...)):
    url = SEGBOT_URL + "segbot-segment-service"
    payload = {"text": input_text.text, 
               "granularity": input_text.granularity, 
               "model": input_text.model,
               "device": input_text.device,
               "conjunctions": input_text.conjunctions}
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    print('responsessfasd', response)

    if response.status_code == 200:
        segs_response = response.json()
        return segs_response
    else:
        raise HTTPException(status_code=response.status_code, detail="API request failed")

# uvicorn main:app --host localhost --port 5000
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
