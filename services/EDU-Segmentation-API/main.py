import json
from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import run_segbot


app = FastAPI()
# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputQuery(BaseModel):
    query: str

class SegmentResult(BaseModel):
    text: str
    segs: list


@app.get("/")
def home():
    return {"health_check": "ok"}


@app.post("/api/segbot-segment-service", response_model=SegmentResult)
def segment_text(input_query: InputQuery = Body(...)):
    segment_result = run_segbot.main_input_output(input_query.query)
    return {"text": input_query.query, "segs": segment_result}


# uvicorn main:app --host localhost --port 8001
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
