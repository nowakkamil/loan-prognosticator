import React, { Component } from 'react';

import Answer from './Answer';
import Popup  from './Popup';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: new Answer(),
      success: true,
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
    this.changeAnswer(key, value)
  }

  changeAnswer(key, value){
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
  }

  togglePopup(answer) {  
    this.setState({ 
        success: answer,
        showPopup: !this.state.showPopup  
    });  
  }  

  chooseInput(key, value){
    if(value === 'number' || value === 'text'){
      return (
        <input
          className="column input"
          name={key}
          type={value}
          onChange={this.handleChange} />
      )
    }else{ 
      if(Array.isArray(value)){
        const defaultOption = value[0]
        return (
          <select 
            value={defaultOption} 
            onChange={this.handleChange}
            className="column input"
            name={key}   
          >
            {value.map((elem, i) => {       
              return (<option value={elem} key={elem} >{elem}</option>) 
            })}
          </select>
        )
      }else{
        if(value === 'radio'){
          return (
            <div className="column input" 
              onChange={this.handleChange}>
              <label>
                <input type="radio" value="yes" name={key} />
                <span>Yes </span>
              </label>
              <label>
                <input type="radio" value="no" name={key}  />
                <span>No </span> 
              </label>
              <label>
                <input type="radio" value="unknown" name={key} defaultChecked />
                <span>Unknown </span>
              </label>
            </div>
          )
        }
      }
    }
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
          {Object.entries(this.state.answer.default_params).map(([key, value]) => (
            <div
              key={key}
              className="row">
              <p className="column label">
                {key.charAt(0).toUpperCase() + key.slice(1) + ': '}
              </p>
              {this.chooseInput(key, value)}
              
              <br />
            </div>))}
          <input className="submit" type="submit" value="Submit" />
        </form>
        
      </div>
    );
  }
}

export default Form;
