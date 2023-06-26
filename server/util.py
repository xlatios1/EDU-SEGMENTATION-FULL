import json
import numpy as np
import pickle

def convert_to_json_from_path(file_path):
    with open(file_path, 'rb') as f:
        data = pickle.load(f)

    def custom_serializer(obj):
        # Check if the object is a NumPy array
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        # Check if the object is a list of lists
        elif isinstance(obj, list) and len(obj) > 0 and isinstance(obj[0], list):
            return [custom_serializer(item) for item in obj]
        # Check if the object is a dictionary
        elif isinstance(obj, dict):
            # Define the structure of the dictionary
            return {'type': 'dict', 'data': {key: custom_serializer(value) for key, value in obj.items()}}
        # Raise a TypeError for any other data types
        raise TypeError('Object of type %s is not JSON serializable' % type(obj).__name__)

    # Convert the dictionary to JSON using the custom serializer
    json_string = json.dumps(data, default=custom_serializer)

    return json_string

def convert_to_json(data):

    def custom_serializer(obj):
        # Check if the object is a NumPy array
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        # Check if the object is a list of lists
        elif isinstance(obj, list) and len(obj) > 0 and isinstance(obj[0], list):
            return [custom_serializer(item) for item in obj]
        # Check if the object is a dictionary
        elif isinstance(obj, dict):
            # Define the structure of the dictionary
            return {'type': 'dict', 'data': {key: custom_serializer(value) for key, value in obj.items()}}
        # Raise a TypeError for any other data types
        raise TypeError('Object of type %s is not JSON serializable' % type(obj).__name__)

    # Convert the dictionary to JSON using the custom serializer
    json_string = json.dumps(data, default=custom_serializer)

    return json_string



def json_to_dict(json_str):
    data = json.loads(json_str)
    result = []
    for key in data:
        result += data[key]
    for obj in result: 
        obj['raw_text']=obj['text']
        obj['text'] = " ".join(obj['text'])
    return result 

# def generate_full_text(data):



if __name__ == "__main__":
    json_string = convert_to_json_from_path("data/rest_han_reg_v2_test.raw")
    # print(json_string)
    dict = json_to_dict(json_string)
    print(dict)


    




