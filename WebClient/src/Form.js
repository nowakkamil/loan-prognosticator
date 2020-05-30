import React, { Component } from 'react';
import Answer from './Answer';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: new Answer()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const key = target.name;
    this.setState(prevState => {
      let answer = { ...prevState.answer };
      answer.parameters[key] = value;
      return { answer };
    })
  }

  handleSubmit(event) {
    this.state.answer.submitAnswer();
    event.preventDefault();
    this.props.handler();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

      {Object.keys(this.state.answer.parameters).map(key => {
        return(<label key={key}>
          {key[0].toUpperCase() + key.slice(1)}:{' '}
          <input name = {key}
          onChange={this.handleChange} />
          <br />
        </label>)
      })}

      <input type="submit" value="Submit" />
    </form>
    );
  }
}
export default Form;