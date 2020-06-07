import axios from 'axios';

class Answer {
  constructor(props) {
    this.default_params = {
      'req':{
        'age': 'number',
        'job': ['unknown', 'admin.','blue-collar','entrepreneur','housemaid','management','retired','self-employed','services','student','technician','unemployed'],
        'marital': ['unknown','single','married', 'divorced'],
        'education': ['unknown', 'primary', 'secondary', 'tertiary'],
        'default': 'radio',
        'balance': 'number',
        'housing': 'radio',
        'loan': 'radio',
      },
      'optional':{
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
    this.parameters = {}
    this.populateParameters(this.default_params['req'])
    this.populateParameters(this.default_params['optional'])
    
    this.answer = null;
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async submitAnswer(handler) {
    console.log(this.parameters)
    await axios.post(`http://localhost:5000`, this.parameters)
      .then(response => {
        console.log(response)
        this.answer = response
      })
      .catch(error => console.error(error.response.data))
    handler(true)
  }

  populateParameters(param_dict){
    for (var key in param_dict) {
      if (param_dict.hasOwnProperty(key)) {  
        if (param_dict[key] === "number"){
          this.parameters[key] = 0;
        }else{
          if(param_dict[key] === "radio"){
            this.parameters[key] = 'unknown';
          }else{
            this.parameters[key] = param_dict[key][0];
          }
        }
      }
    }
  }
}

export default Answer;
