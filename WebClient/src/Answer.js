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
      this.submit_answer = this.submit_answer.bind(this);
    }

    submit_answer(){
      // var xhr = new XMLHttpRequest();
      // xhr.addEventListener('load', () => {
      //   console.log(xhr.responseText)
      // })
      // xhr.open('POST', 'http://127.0.0.1:5000/')
      // // send the request
      // xhr.send(JSON.stringify(this.p))
      console.log(JSON.stringify(this.p))
      axios.post(`http://localhost:5000`, JSON.stringify(this.p))
            .then(response => console.log(response))
            
    }
}
export default Answer;