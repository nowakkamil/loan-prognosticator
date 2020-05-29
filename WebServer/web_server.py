from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from cerberus import Validator
from pathlib import Path
import sklearn
import joblib

import importlib
import sys
import json
import pandas as pd


# Import python file with relative path
DATA_FRAME_SELECTOR_PATH = Path(
    __file__).parent.absolute().parents[0] / 'Model'
sys.path.append(str(DATA_FRAME_SELECTOR_PATH))
importlib.import_module('data_frame_selector', 'DataFrameSelector')

# Define paths to files
CURRENT_DIR = Path(__file__).parent.absolute().parents[0]
MODEL_PATH = CURRENT_DIR / 'Model' / 'gradient_boosting_classifier.pkl'
PIPELINE_PATH = CURRENT_DIR / 'Model' / 'transform_pipeline.pkl'

# Load the model
model = joblib.load(MODEL_PATH)

# Load the pipeline
preprocess_pipeline = joblib.load(PIPELINE_PATH)

# Define validation rules
schema = {
    'age': {'type': 'integer'},
    'job': {'type': 'string'},
    'marital': {'type': 'string'},
    'education': {'type': 'string'},
    'default': {'type': 'string'},
    'balance': {'type': 'integer'},
    'housing': {'type': 'string'},
    'loan': {'type': 'string'},
    'contact': {'type': 'string'},
    'day': {'type': 'integer'},
    'month': {'type': 'string'},
    'duration': {'type': 'integer'},
    'campaign': {'type': 'integer'},
    'pdays': {'type': 'integer'},
    'previous': {'type': 'integer'},
    'poutcome': {'type': 'string'}
}
validator = Validator(schema)

# DataFrame column definition
columns = ["age",
           "job",
           "marital",
           "education",
           "default",
           "balance",
           "housing",
           "loan",
           "contact",
           "day",
           "month",
           "duration",
           "campaign",
           "pdays",
           "previous",
           "poutcome"]

# Flask app
app = Flask(__name__)
api = Api(app)


class WebServer(Resource):
    def post(self):
        payload = request.get_json()
        print('Payload:\n' + json.dumps(payload, indent=4) + '\n')

        if not validator.validate(payload):
            return validator.errors, 400

        data = dict.fromkeys(payload)
        for k, v in payload.items():
            data[k] = [v]

        df = pd.DataFrame(data, columns=columns)
        model_input = preprocess_pipeline.transform(df)
        model_output = model.predict(model_input)
        outcome = bool(model_output)

        return jsonify(outcome=outcome)


api.add_resource(WebServer, '/')

if __name__ == '__main__':
    app.run(use_debugger=False, use_reloader=False, passthrough_errors=True)
