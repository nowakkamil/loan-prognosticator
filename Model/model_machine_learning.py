from sklearn.metrics import accuracy_score
from sklearn.pipeline import FeatureUnion
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler, LabelEncoder

from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn import tree
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.gaussian_process.kernels import RBF
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB

from sklearn.model_selection import StratifiedShuffleSplit

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from sklearn.model_selection import cross_val_score

# Cross validate Gradient Boosting Classifier
from sklearn.model_selection import cross_val_predict

from sklearn.externals import joblib

from pathlib import Path

from categorical_encoder import CategoricalEncoder
from data_frame_selector import DataFrameSelector

import pandas as pd
import constants


CURRENT_DIR = Path(__file__).parent.absolute()
FULL_PATH = CURRENT_DIR / 'bank.csv'
df = pd.read_csv(FULL_PATH, ';')

df.rename(columns={'y': 'deposit'}, inplace=True)

term_deposits = df.copy()

print(df.head())

df['deposit'].value_counts()

df.columns

dep = term_deposits['deposit']
term_deposits.drop(labels=['deposit'], axis=1, inplace=True)
term_deposits.insert(0, 'deposit', dep)

# Split the data into training and test sets and implement a stratified shuffle split
stratified = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)

for train_set, test_set in stratified.split(term_deposits, term_deposits["loan"]):
    stratified_train = term_deposits.loc[train_set]
    stratified_test = term_deposits.loc[test_set]

# Separate the labels and the features
train_data = stratified_train

# Make a copy of the stratified training set
test_data = stratified_test
train_data.shape
test_data.shape
train_data['deposit'].value_counts()

train_data.info()


def train_model_with_given_attibutes(attributes_type):
    # Pipelines definition
    numerical_pipeline = Pipeline([
        ("select_numeric", DataFrameSelector(
            constants.attributes[attributes_type][constants.numerical])),
        ("std_scaler", StandardScaler()),
    ])

    categorical_pipeline = Pipeline([
        ("select_cat", DataFrameSelector(
            constants.attributes[attributes_type][constants.categorical])),
        ("cat_encoder", CategoricalEncoder(encoding='onehot-dense'))
    ])

    preprocess_pipeline = FeatureUnion(transformer_list=[
        ("numerical_pipeline", numerical_pipeline),
        ("categorical_pipeline", categorical_pipeline),
    ])
    preprocess_pipeline = preprocess_pipeline.fit(train_data)

    X_train = preprocess_pipeline.transform(train_data)

    # Save the pipeline to file
    joblib.dump(preprocess_pipeline, CURRENT_DIR / 'pipeline' /
                f'transform_pipeline_{attributes_type}.pkl')

    y_train = train_data['deposit']
    y_test = test_data['deposit']
    y_train.shape

    encode = LabelEncoder()
    y_train = encode.fit_transform(y_train)
    y_test = encode.fit_transform(y_test)
    y_train_yes = (y_train == 1)
    y_train
    y_train_yes

    # Gradient Boosting Classifier
    grad_clf = GradientBoostingClassifier()
    grad_scores = cross_val_score(grad_clf, X_train, y_train, cv=3)
    grad_mean = grad_scores.mean()

    y_train_pred = cross_val_predict(grad_clf, X_train, y_train, cv=3)

    grad_clf.fit(X_train, y_train)
    print("Gradient Boost Classifier accuracy is %2.2f" %
          accuracy_score(y_train, y_train_pred))

    # Save the model to file
    joblib.dump(grad_clf, CURRENT_DIR / 'model' /
                f'gradient_boosting_classifier_{attributes_type}.pkl')


# Train model with bank data attributes only and by including all attributes
train_model_with_given_attibutes(constants.all)
train_model_with_given_attibutes(constants.bank_data)
