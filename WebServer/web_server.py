from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from cerberus import Validator
from pathlib import Path
from sklearn.externals import joblib

import importlib
import sys
import json

# Import python file with relative path
DATA_FRAME_SELECTOR_PATH = Path(
    __file__).parent.absolute().parents[0] / "Model"
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
schema = {'age': {'type': 'integer'}}
validator = Validator(schema)

# Flask app
app = Flask(__name__)
api = Api(app)


class WebServer(Resource):
    def post(self):
        data = request.get_json()
        print('Payload:\n' + json.dumps(data, indent=4))

        if not validator.validate(data):
            return validator.errors, 400

        return jsonify(outcome=True)


api.add_resource(WebServer, '/')

if __name__ == '__main__':
    app.run(use_debugger=False, use_reloader=False, passthrough_errors=True)
