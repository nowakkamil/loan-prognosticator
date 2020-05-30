from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from cerberus import Validator
from pathlib import Path

import importlib
import sys
import joblib
import json
import pandas as pd


# Import python file with relative path
DATA_FRAME_SELECTOR_PATH = Path(
    __file__).parent.absolute().parents[0] / 'Model'
sys.path.append(str(DATA_FRAME_SELECTOR_PATH))
importlib.import_module('data_frame_selector', 'DataFrameSelector')

# Define paths to files: pipelines and models for all attributes
# as well as bank data attributes only
CURRENT_DIR = Path(__file__).parent.absolute().parents[0]
# Model trained with all attributes
MODEL_ALL_PATH = CURRENT_DIR / 'Model' / \
    'model' / 'gradient_boosting_classifier_all.pkl'
PIPELINE_ALL_PATH = CURRENT_DIR / 'Model' / 'pipeline' / \
    'transform_pipeline_all.pkl'
# Model trained with bank data attributes only
MODEL_BANK_DATA_PATH = CURRENT_DIR / 'Model' / \
    'model' / 'gradient_boosting_classifier_bank_data.pkl'
PIPELINE_BANK_DATA_PATH = CURRENT_DIR / 'Model' / 'pipeline' / \
    'transform_pipeline_bank_data.pkl'

# Load the models
model_all = joblib.load(MODEL_ALL_PATH)
model_bank_data = joblib.load(MODEL_BANK_DATA_PATH)

# Load the pipelines
preprocess_pipeline_all = joblib.load(PIPELINE_ALL_PATH)
preprocess_pipeline_bank_data = joblib.load(PIPELINE_BANK_DATA_PATH)

# Define schema for validation rules and DataFrame definition
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

# Flask app
app = Flask(__name__)
api = Api(app)
cors = CORS(app, allow_headers='*',
            origins='*', methods='*', expose_headers='Authorization')


class WebServer(Resource):
    @cross_origin()
    def post(self):
        payload = request.get_json()
        print('Payload:\n' + json.dumps(payload, indent=4) + '\n')

        if not validator.validate(payload):
            return validator.errors, 400

        data = dict.fromkeys(payload)
        for k, v in payload.items():
            data[k] = [v]

        df = pd.DataFrame(data, columns=schema.keys())

        bank_data_only = request.args.get("bank_data_only")
        if bank_data_only is None:
            model_input = preprocess_pipeline_all.transform(df)
            model_output = model_all.predict(model_input)
        else:
            model_input = preprocess_pipeline_bank_data.transform(df)
            model_output = model_bank_data.predict(model_input)

        outcome = bool(model_output)

        return jsonify(outcome=outcome)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST')

        return response


api.add_resource(WebServer, '/')

if __name__ == '__main__':
    app.run(use_debugger=False, use_reloader=False, passthrough_errors=True)
