import axios from 'axios';

class Answer {
  constructor(props) {
    this.default_params = {
      'age': 'number',
      'job': ['admin.','blue-collar','entrepreneur','housemaid','management','retired','self-employed','services','student','technician','unemployed','unknown'],
      'marital': ['divorced','married','single','unknown'],
      'education': [ 'primary', 'secondary', 'tertiary', 'unknown'],
      'default': 'radio',
      'balance': 'number',
      'housing': 'radio',
      'loan': 'radio',
      'contact': ['cellular','telephone'],
      'day': ['mon','tue','wed','thu','fri'],
      'month': ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      'duration': 'number',
      'campaign': 'number',
      'pdays':'number',
      'previous': 'number',
      'poutcome': ['failure','nonexistent','success']
    };
    this.parameters = {}
    for (var key in this.default_params) {
      if (this.default_params.hasOwnProperty(key)) {  
        if (this.default_params[key] === "number"){
          this.parameters[key] = 0;
        }else{
          if(this.default_params[key] === "radio"){
            this.parameters[key] = 'unknown';
          }else{
            this.parameters[key] = this.default_params[key][0];
          }
        }
      }
    }
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
}

export default Answer;
