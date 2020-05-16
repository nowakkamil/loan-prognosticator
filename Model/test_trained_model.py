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

# Load the model
model = joblib.load(FULL_PATH)

# Test data
# Expected output: "no"
test_data = [34, "technician", "married", "secondary", "no", 1026,
             "no", "no", "cellular", 12, "nov", 319, 1, 100, 6, "failure"]

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

data = {"age": [34],
        "job": ["technician"],
        "marital": ["married"],
        "education": ["secondary"],
        "default": ["no"],
        "balance": [1026],
        "housing": ["no"],
        "loan": ["no"],
        "contact": ["cellular"],
        "day": [12],
        "month": ["nov"],
        "duration": [319],
        "campaign": [1],
        "pdays": [100],
        "previous": [6],
        "poutcome": ["failure"]}


# Create the pandas DataFrame
df = pd.DataFrame(data, columns=columns)

print(df)

# Pipelines definition
numerical_pipeline = Pipeline([
    ("select_numeric", DataFrameSelector(
        ["age", "balance", "day", "campaign", "pdays", "previous", "duration"])),
    ("std_scaler", StandardScaler()),
])

categorical_pipeline = Pipeline([
    ("select_cat", DataFrameSelector(["job", "education", "marital", "default", "housing", "loan", "contact", "month",
                                      "poutcome"])),
    ("cat_encoder", CategoricalEncoder(encoding='onehot-dense'))
])

preprocess_pipeline = FeatureUnion(transformer_list=[
    ("numerical_pipeline", numerical_pipeline),
    ("categorical_pipeline", categorical_pipeline),
])

X_test = preprocess_pipeline.fit_transform(df)
print(X_test)

output = model.predict(X_test)
print(output)
