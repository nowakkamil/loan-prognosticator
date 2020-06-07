import React, { Component } from 'react';
import Switch from "react-switch";

import Answer from './Answer';
import Popup  from './Popup';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: new Answer(),
      success: true,
      showPopup: false,
      optional: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.changeOptional = this.changeOptional.bind(this);
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
  }
  
  componentWillReceiveProps(props) {
    this.setState({ 
      optional: props.optional })
  }
  
  changeOptional(){
    this.setState({
      optional: !this.state.optional
    })
  }

  togglePopup(answer) {  
    this.setState({ 
        success: answer,
        showPopup: !this.state.showPopup  
    });  
  }  

  chooseInput(key, value){
    if(value === 'number' || value === 'text'){
      return(this.simpleInputChosen(key, value))
    }else{ 
      if(Array.isArray(value)){
        return(this.dropDownChosen(key, value))
      }else{
        if(value === 'radio'){
          return(this.radioButtonsChosen(key, value))
        }
      }
    }
  }

  simpleInputChosen(key, value){
    return (
      <input
        className="column input"
        name={key}
        type={value}
        onChange={this.handleChange} />
    )
  }

  dropDownChosen(key, value){
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
  }

  radioButtonsChosen(key, value){
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

  populateForm(param_dict){
    return(
      <React.Fragment>
        {Object.entries(param_dict).map(([key, value]) => (
        <div
          key={key}
          className="row">
          <p className="column label">
            {key.charAt(0).toUpperCase() + key.slice(1) + ': '}
          </p>
          {this.chooseInput(key, value)}
          <br />
        </div>))}
      </React.Fragment>
      
    )
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
          {this.populateForm(this.state.answer.default_params['req'])}
          {this.state.optional ?
            this.populateForm(this.state.answer.default_params['optional'])
            : null
          }
          <input className="submit" type="submit" value="Submit" />
        </form>

        <Switch onChange={this.changeOptional} checked={this.state.optional} />

      </div>
    );
  }
}

export default Form;
