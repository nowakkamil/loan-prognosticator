from pathlib import Path
from sklearn.externals import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.pipeline import FeatureUnion
from data_frame_selector import DataFrameSelector
from categorical_encoder import CategoricalEncoder

import numpy as np
import pandas as pd


CURRENT_DIR = Path(__file__).parent.absolute()
FULL_PATH = CURRENT_DIR / 'gradient_boosting_classifier.pkl'
PIPELINE_PATH = CURRENT_DIR / 'transform_pipeline.pkl'

# Load the model
model = joblib.load(FULL_PATH)

# Load the pipeline
preprocess_pipeline = joblib.load(PIPELINE_PATH)

# Test data
# [34, "technician", "married", "secondary", "no", 1026, "no", "no", "cellular", 12, "nov", 319, 1, 100, 6, "failure"]
# Expected output: "no"
# [34, "technician", "married", "secondary", "no", 133, "no", "no", "cellular", 15, "nov", 401, 2, 187, 6, "success"]
# Expected output: "yes"

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

data = {"age": [34, 34],
        "job": ["technician", "technician"],
        "marital": ["married", "married"],
        "education": ["secondary", "secondary"],
        "default": ["no", "no"],
        "balance": [1026, 133],
        "housing": ["no", "no"],
        "loan": ["no", "no"],
        "contact": ["cellular", "cellular"],
        "day": [12, 15],
        "month": ["nov", "nov"],
        "duration": [319, 401],
        "campaign": [1, 2],
        "pdays": [100, 187],
        "previous": [6, 6],
        "poutcome": ["failure", "success"]}

# Create the pandas DataFrame
df = pd.DataFrame(data, columns=columns)
print(df)

X_test = preprocess_pipeline.transform(df)
print(X_test)

output = model.predict(X_test)
print(output)

formatted_output = ["no" if x == 0 else "yes" for x in output]
print(formatted_output)
