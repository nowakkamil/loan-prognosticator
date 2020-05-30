import axios from 'axios';

class Answer{
    constructor(props) {
      this.parameters = {};
      this.parameters['age'] = '';
      this.parameters['job'] = '';
      this.parameters['marital'] = '';
      this.parameters['education'] = '';
      this.parameters['default'] = '';
      this.parameters['balance'] = '';
      this.parameters['housing'] = '';
      this.parameters['loan'] = '';
      this.parameters['contact'] = '';
      this.parameters['day'] = '';
      this.parameters['month'] = '';
      this.parameters['duration'] = '';
      this.parameters['campaign'] = '';
      this.parameters['pdays'] = '';
      this.parameters['previous'] = '';
      this.parameters['poutcome'] = '';
      this.answer = null;
      this.submitAnswer = this.submitAnswer.bind(this);
    }

    submitAnswer(){
      console.log(this.parameters)
      axios.post(`http://localhost:5000`, this.parameters)
            .then(response => console.log(response))
            .catch(error => console.error(error.response.data))
    }
}

export default Answer;
