# EDU-Web-Interface

EDU-Web-Interface is a sentiment analysis platform that follows a microservices-based architecture for analyzing restaurant reviews. It consists of three main components: a frontend application, an API Gateway, and a set of microservices. This repository contains the API Gateway and the Main Backend Service.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Microservices](#microservices)

## Prerequisites
- Python 3.9 or later
- pip (Python package installer)

## Installation

1. Clone the repository:
    
    ```
    git clone --recurse-submodules https://github.com/averliz/EDU-Web-Interface.git
    ```
    
2. Navigate to the server directory:
    ```
    cd EDU-Web-Interface/server
    ```

3. Create a new virtual environment in the cloned directory. 
   ```
   python3 -m venv env
   ```
4. Activate the virtual environment. 
   For macOS:
   ```
   source env/bin/activate
   ```
   For Windows (using Command Prompt):
   ```
   env\Scripts\activate
   ```

5. Install the required dependencies:

    ```
    pip install -r requirements.txt
    ```

## Usage

1. Start the API Gateway:

    ```
    uvicorn api_gateway:app --host localhost --port 4000
    ```

2. Start the Main Backend Service:

    ```
    uvicorn server:app --host localhost --port 5000
    ```

3. Navigate to the frontend application URL (Client) to interact with the sentiment analysis platform.

## Microservices
- Main Backend Service: Processes raw review text, sends it to the EDU-Segmentation-API Microservice for sentence segmentation, and performs sentiment analysis on the segmented sentences.
- EDU-Segmentation-API Microservice: Segments raw review text into sentences. https://github.com/averliz/EDU-Segmentation-API
- EDU-Sentiment-API Microservice: Performs sentiment analysis on the segmented sentences. GitHub Repository https://github.com/averliz/EDU-Sentiment-API 

## Updating Submodules

To ensure that all submodules in the project are up-to-date and synchronized with their upstream repositories, run the following command:
```
git submodule update --remote --merge
```

This command performs the following actions:

Initializes any uninitialized submodules, setting up the necessary Git configuration files and preparing the submodule directories for fetching their contents.
Updates the submodule(s) to the latest commit in their respective repositories by fetching the latest changes and updating the submodule's working tree to the appropriate commit.
Applies the update process recursively to any nested submodules within the current submodule(s), ensuring that all nested submodules are initialized and updated as well.
Remember to run this command regularly to keep all submodules in the project updated and in sync with their upstream repositories.

