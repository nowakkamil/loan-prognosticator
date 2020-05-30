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
    let value = target.value;
    const key = target.name;
    this.setState(prevState => {
      let answer = { ...prevState.answer };

      if (!isNaN(value)) {
        value = parseInt(value);
      }

      answer.parameters[key] = value;
      return { answer };
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.state.answer.submitAnswer();
    this.props.handler();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.entries(this.state.answer.parameters).map(([key, value]) => (
          <label
            key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1) + ': '}
            <input
              name={key}
              type={(Number.isInteger(value)) ? "number" : "text"}
              onChange={this.handleChange} />
            <br />
          </label>))}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
