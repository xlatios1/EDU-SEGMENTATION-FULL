from edu_segmentation import download, main

def main_input_output(sent, granularity_level="default", model="bart", conjunctions=['and','or','however'], device='cpu'):
    if conjunctions == "default":
        conjunctions = ["and", "or", "however"]
    elif type(conjunctions) == str:
        conjunctions = conjunctions.split(",")
    download.download_models()
    return main.run_segbot(sent, granularity_level=granularity_level, model=model, conjunctions=conjunctions, device=device)
