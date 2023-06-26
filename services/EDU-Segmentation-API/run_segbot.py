from edu_segmentation import download, main

def main_input_output(sent, granularity_level="default", model="bart"):
    download.download_models()
    return main.run_segbot(sent, granularity_level=granularity_level, model=model)
