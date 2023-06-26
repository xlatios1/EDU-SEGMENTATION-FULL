# SegBot Text Segmentation Microservice

This repository contains an implementation of a text segmentation microservice using the SegBot neural network model. The microservice is implemented using the FastAPI web framework and includes a pre-trained SegBot model for use in segmenting input text.

## Prerequisites

Before running the microservice, you will need to ensure that the following prerequisites are met:

- Python 3.7 installed on your system
- Anaconda package manager installed (can be installed from https://www.anaconda.com/distribution/)
- `conda` environment manager installed

## Installation

To install the microservice, follow these steps:

1. Clone the repository to your local system.

```
git clone https://github.com/averliz/EDU-Segmentation-API
cd EDU-Segmentation-API
```

2. Create a new virtual environment using Anaconda for Python 3.7:
```
conda create --name segbot python=3.7
conda activate segbot
```

3. Install the `torch` package by running the following command:
```
pip install https://download.pytorch.org/whl/cpu/torch-1.2.0%2Bcpu-cp37-cp37m-manylinux1_x86_64.whl
```

4. Install the required dependencies:
```
pip install -r requirements.txt (uvicorn, fastapi)
```


## Usage

To start the FastAPI server, run the following command in your terminal while your virtual environment is activated:

```
uvicorn main:app --reload
```
```
uvicorn main:app --host localhost --port 8001
```
the second command is preferred

This will start the FastAPI server at `http://localhost:8001`. You can send HTTP POST requests to `http://localhost:8001/api/segbot-segment-service` with JSON input data to get segmented output.
