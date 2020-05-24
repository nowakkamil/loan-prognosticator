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
    }

    submit_answer(){
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        console.log(xhr.responseText)
      })
      xhr.open('POST', 'https://dog.ceo/api/breeds/list/all')
      // send the request
      xhr.send(JSON.stringify(this.p))
    }
}
export default Answer;