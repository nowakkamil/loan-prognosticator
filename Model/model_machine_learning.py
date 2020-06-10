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

from sklearn.model_selection import cross_val_predict


from pathlib import Path

from categorical_encoder import CategoricalEncoder
from data_frame_selector import DataFrameSelector

import pandas as pd
import constants
import joblib


CURRENT_DIR = Path(__file__).parent.absolute()
FULL_PATH = CURRENT_DIR / 'bank.csv'
df = pd.read_csv(FULL_PATH, ';')

df.rename(columns={'y': 'deposit'}, inplace=True)

term_deposits = df.copy()

dep = term_deposits['deposit']
term_deposits.drop(labels=['deposit'], axis=1, inplace=True)
term_deposits.insert(0, 'deposit', dep)

stratified = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)

for train_set, test_set in stratified.split(term_deposits, term_deposits["loan"]):
    stratified_train = term_deposits.loc[train_set]
    stratified_test = term_deposits.loc[test_set]

train_data = stratified_train
test_data = stratified_test

def train_model_with_given_attibutes(attributes_type):
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

    joblib.dump(preprocess_pipeline, CURRENT_DIR / 'pipeline' /
                f'transform_pipeline_{attributes_type}.pkl')

    y_train = train_data['deposit']
    y_test = test_data['deposit']

    encode = LabelEncoder()
    y_train = encode.fit_transform(y_train)
    y_test = encode.fit_transform(y_test)

    grad_clf = GradientBoostingClassifier()

    y_train_pred = cross_val_predict(grad_clf, X_train, y_train, cv=3)

    grad_clf.fit(X_train, y_train)
    print(f"Accuracy of trained model for {constants.strings[attributes_type]} " +
          "attributes is {:.2%}".format(accuracy_score(y_train, y_train_pred)))

    joblib.dump(grad_clf, CURRENT_DIR / 'model' /
                f'gradient_boosting_classifier_{attributes_type}.pkl')


train_model_with_given_attibutes(constants.all)
train_model_with_given_attibutes(constants.bank_data)
