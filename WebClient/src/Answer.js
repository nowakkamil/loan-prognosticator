import axios from 'axios';

const post_adress = 'http://127.0.0.1:5000/?bank_data_only';
const req = 'req';
const opt = 'opt';

class Answer {
  constructor(props) {
    this.default_params = {
      req:{
        'age': 'number',
        'job': ['unknown', 'admin.','blue-collar','entrepreneur','housemaid','management','retired','self-employed','services','student','technician','unemployed'],
        'marital': ['unknown','single','married', 'divorced'],
        'education': ['unknown', 'primary', 'secondary', 'tertiary'],
        'default': 'radio',
        'balance': 'number',
        'housing': 'radio',
        'loan': 'radio',
      },
      opt:{
        'contact': ['telephone', 'cellular'],
        'day': ['mon','tue','wed','thu','fri'],
        'month': ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        'duration': 'number',
        'campaign': 'number',
        'pdays':'number',
        'previous': 'number',
        'poutcome': ['nonexistent', 'success', 'failure']
      }
    };
    this.parameters = {req:{}, opt:{}}
    this.populateParameters(req)
    this.populateParameters(opt)
    
    this.answer = null;
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async submitAnswer(handler, optional) {
    let post_dict = Object.assign({}, this.parameters[req]);
    if(optional === true){
      post_dict = Object.assign({}, this.parameters[req], this.parameters[opt]);
    }
    console.log(post_dict)
    await axios.post(post_adress, post_dict)
      .then(response => {
        console.log(response)
        this.answer = response
      })
      .catch(error => console.error(error.response.data))
    handler(this.answer.data.outcome)
  }

  populateParameters(mode){
    var param_dict = this.default_params[mode]

    for (var key in param_dict) {
      if (param_dict.hasOwnProperty(key)) {  
        if (param_dict[key] === "number"){
          this.parameters[mode][key] = 0;
        }else{
          if(param_dict[key] === "radio"){
            this.parameters[mode][key] = 'unknown';
          }else{
            this.parameters[mode][key] = param_dict[key][0];
          }
        }
      }
    }
  }
}

export default Answer;
