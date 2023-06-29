# EDU-Web-Interface

Welcome to the EDU-Web-Interface repository, an integral part of a sentiment analysis platform designed to analyze restaurant reviews. This platform is based on a microservices architecture and is composed of three primary components: a React-based frontend application, an API Gateway, and a suite of microservices.

The frontend application serves as the user interface for visualizing restaurant review data, submitting new reviews, and displaying the results of the sentiment analysis. This frontend has been crafted to provide a seamless experience for users interacting with our platform.

Simultaneously, the backend of this system, composed of the API Gateway and main backend service, handles all the data processing and communication logistics. It manages the requests made from the frontend and coordinates with the microservices to provide insightful sentiment analysis.

This project is part of the research study - "Aspect-based Sentiment Analysis through EDU-level Attentions" - accepted at the 26th Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD2022). It serves as a demonstration of the potential applications of our research findings in the field of sentiment analysis.

## Table of Contents
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)

## Repository Structure
- `Client/`: Contains all the frontend code built with React
- `Server/`: Holds all the backend code, including the API Gateway and the main Backend service
- `services/`: Includes two GitHub Submodules that link to the Microservices used in this project:
    - Edu-Segmentation-API
    - EDU-Sentiment-API
    
Each of these folders has its own README file to describe in detail how to setup and run their individual components.



## Getting Started

Here's a quick guide to navigate through the different parts of the project and run it on your local machine:

1. **Clone the repository**
   Use the following command to clone this repository along with its submodules:
    ```
    git clone --recurse-submodules https://github.com/yourusername/EDU-Web-Interface.git

    ```

2. **Navigate to the individual components** 
   
    As described above, each major component has its own directory. Visit each of them for specific instructions on how to get started with that component:

    - Frontend: `Client/`
    - Backend: `Server/`
    - Microservices: `services/Edu-Segmentation-API` and `services/EDU-Sentiment-API`
    
    Each directory contains a README file with specific instructions on setting up the respective component. Be sure to follow these        instructions to ensure a successful setup.

    Note: Replace yourusername in the clone command above with your actual GitHub username.

patria:

simply run .vscode/tasks.json in vscode to start up all environments required.