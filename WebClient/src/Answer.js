import axios from 'axios';

class Answer {
  constructor(props) {
    this.parameters = {
      'age': 0,
      'job': '',
      'marital': '',
      'education': '',
      'default': '',
      'balance': 0,
      'housing': '',
      'loan': '',
      'contact': '',
      'day': 0,
      'month': '',
      'duration': 0,
      'campaign': 0,
      'pdays': 0,
      'previous': 0,
      'poutcome': ''
    };
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
    handler(this.answer)
  }
}

export default Answer;
