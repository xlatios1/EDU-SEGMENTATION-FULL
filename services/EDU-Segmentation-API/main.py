from fastapi import FastAPI, Body
from pydantic import BaseModel
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
    text: str
    granularity: str
    model: str
    device: str
    conjunctions: str

class SegmentResult(BaseModel):
    text: str
    granularity: str
    model: str
    device: str
    conjunctions: str
    segs: list


@app.get("/")
def home():
    return {"health_check": "ok"}


@app.post("/api/segbot-segment-service", response_model=SegmentResult)
def segment_text(input_query: InputQuery = Body(...)):
    segment_result = run_segbot.main_input_output(
        input_query.text, 
        granularity_level=input_query.granularity, 
        model=input_query.model,
        conjunctions=input_query.conjunctions,
        device=input_query.device
        )
    return {"text": input_query.text, 
            "granularity": input_query.granularity, 
            "model": input_query.model,
            "device": input_query.device,
            "conjunctions": input_query.conjunctions,
            "segs": segment_result}

# uvicorn main:app --host localhost --port 8001
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
