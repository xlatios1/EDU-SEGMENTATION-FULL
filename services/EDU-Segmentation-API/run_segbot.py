from edu_segmentation.download import download_models
from edu_segmentation.main import ModelFactory, EDUSegmentation

def main_input_output(sent, granularity_level="default", model="bart", conjunctions=['and','but','however'], device='cpu'):
    if type(conjunctions) == str:
        conjunctions = conjunctions.split(",")
        conjunctions = [i.strip() for i in conjunctions]
    download_models()
    try:
        model_type = ModelFactory.create_model(model)
        edu_segmentation = EDUSegmentation(model_type)
    except:
        print("No such model exists.")
        return
    return edu_segmentation.run(sent, granularity=granularity_level, conjunctions=conjunctions, device=device)



