numerical = 'numerical'
categorical = 'categorical'

all = 'all'
bank_data = 'bank_data'

attributes = {
    'bank_data': {
        'numerical': ["age", "balance"],
        'categorical': ["job", "education", "marital", "default", "housing", "loan"]
    },
    'all': {
        'numerical': ["age", "balance", "campaign", "pdays", "previous", "duration"],
        'categorical': ["job", "education", "day", "marital", "default", "housing",
                        "loan", "contact", "month", "poutcome"]
    }
}

# Test data for 'all' attributes
# [34, "technician", "married", "secondary", "no", 1026, "no", "no", "cellular", 12, "nov", 319, 1, 100, 6, "failure"]
# Expected output: "no"
# [34, "technician", "married", "secondary", "no", 133, "no", "no", "cellular", 15, "nov", 401, 2, 187, 6, "success"]
# Expected output: "yes"
test_data = {
    'bank_data': {
        "age": [34, 34],
        "job": ["technician", "technician"],
        "marital": ["married", "married"],
        "education": ["secondary", "secondary"],
        "default": ["no", "no"],
        "balance": [1026, 133],
        "housing": ["no", "no"],
        "loan": ["no", "no"],
    },
    'all': {
        "age": [34, 34],
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
        "poutcome": ["failure", "success"]
    }
}
