import axios from 'axios';

const postAdressRequired = 'http://127.0.0.1:5000/?bank_data_only';
const postAdressOptional = 'http://127.0.0.1:5000/';
const req = 'req';
const opt = 'opt';

class Answer {
  constructor() {
    this.defaultParams = {
      req: {
        'age': 'number',
        'job': ['admin.', 'blue-collar', 'entrepreneur', 'housemaid', 'management',
          'retired', 'self-employed', 'services', 'student', 'technician', 'unemployed'],
        'marital': ['single', 'married', 'divorced'],
        'education': ['primary', 'secondary', 'tertiary'],
        'default': ['yes', 'no'],
        'balance': 'number',
        'housing': ['yes', 'no'],
        'loan': ['yes', 'no']
      },
      opt: {
        'contact': ['telephone', 'cellular'],
        'day': 'number',
        'month': ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        'duration': 'number',
        'campaign': 'number',
        'pdays': 'number',
        'previous': 'number',
        'poutcome': ['nonexistent', 'success', 'failure']
      }
    };
    this.parameters = { req: {}, opt: {} }
    this.populateParameters(req)
    this.populateParameters(opt)

    this.answer = null;
    this.submitAnswer = this.submitAnswer.bind(this)
    this.getModeAnswer = this.getModeAnswer.bind(this)
  }

  async submitAnswer(handler, optional) {
    let postDictionary = this.getModeAnswer(optional)
    let postAdress = postAdressRequired
    if (optional) {
      postAdress = postAdressOptional
    }
    console.log(postDictionary)
    await axios.post(postAdress, postDictionary)
      .then(response => {
        console.log(response)
        this.answer = response
      })
      .catch(error => console.error(error.response.data))
    handler(this.answer.data.outcome)
  }

  getModeAnswer(optional) {
    let dict = Object.assign({}, this.parameters[req]);
    if (optional === true) {
      dict = Object.assign({}, this.parameters[req], this.parameters[opt]);
    }
    return dict
  }

  populateParameters(mode) {
    var paramsDict = this.defaultParams[mode]

    for (var key in paramsDict) {
      if (paramsDict.hasOwnProperty(key)) {
        if (paramsDict[key] === "number") {
          this.parameters[mode][key] = -1;
        } else {
          if (paramsDict[key] === "radio") {
            this.parameters[mode][key] = 'unknown';
          } else {
            this.parameters[mode][key] = paramsDict[key][0];
          }
        }
      }
    }
  }
}

export default Answer;
