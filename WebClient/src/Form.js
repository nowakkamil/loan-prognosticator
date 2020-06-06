import React, { Component } from 'react';
import './Form.css'
import Answer from './Answer';
import Popup  from './Popup';

const form_answer = document.querySelector(".form-answer");

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: new Answer(),
      success: false,
      showPopup: false
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
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
    await this.state.answer.submitAnswer(this.togglePopup);
    //this.props.handler();
  }

  togglePopup(answer) {  
    //form_answer.style.display =='none' ? form_answer.style.display = 'block' : form_answer.style.display = 'none'
    this.setState({ 
        success: answer,
        showPopup: !this.state.showPopup  
    });  
  }  

  render() {
    return (
      <div className="form-answer">
        {this.state.showPopup ?  
          <Popup 
            success={this.success}  
            closePopup={this.togglePopup} 
          />  
          : null  
        }  
        <form className="form" onSubmit={this.handleSubmit}>
          {Object.entries(this.state.answer.parameters).map(([key, value]) => (
            <div
              key={key}
              className="row">
              <p className="column label">
                {key.charAt(0).toUpperCase() + key.slice(1) + ': '}
              </p>
              <input
                className="column input"
                name={key}
                type={(Number.isInteger(value)) ? "number" : "text"}
                onChange={this.handleChange} />
              <br />
            </div>))}
          <input className="submit" type="submit" value="Submit" />
        </form>
        
      </div>
    );
  }
}

export default Form;
