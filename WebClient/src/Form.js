import React, { Component } from 'react';
import Switch from "react-switch";

import Answer from './Answer';
import Popup  from './Popup';

const req = 'req';
const opt = 'opt';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: new Answer(),
      success: true,
      showPopup: false,
      optional: this.props.optional
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.changeOptional = this.changeOptional.bind(this)
    this.reverseOptional = this.reverseOptional.bind(this)
    this.Popup = React.createRef()
    this._Submit = React.createRef()
    this._DropDown = React.createRef()
  }

  handleChange(event, mode) {
    const target = event.target;
    let value = target.value;
    const key = target.name;
    this.setState(prevState => {
      let answer = { ...prevState.answer };

      if (!isNaN(value)) {
        value = parseInt(value);
      }

      answer.parameters[mode][key] = value;
      return { answer };
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    if(!this.checkAnswer()){
      alert("You have to fill all the fields")
      return
    }
    await this.state.answer.submitAnswer(this.togglePopup, this.state.optional);
  }

  checkAnswer(){
    let answer_dict = this.state.answer.getModeAnswer(this.state.optional)
    for (var key in answer_dict){
      if(answer_dict[key] === 0 ||
        answer_dict[key] === "unknown"){
        return false
      }  
    }
    return true
  }
  
  changeOptional(_optional){
    this.setState({
      optional: _optional
    })
  }

  reverseOptional(){
    this.setState({
      optional: !this.state.optional
    })
  }

  togglePopup(answer) {  
    this._Submit.current.disabled = !this._Submit.current.disabled
    this.setState({ 
        showPopup: !this.state.showPopup  
    }); 
    this.Popup.current.changeSuccess(answer)
  }  

  chooseInput(key, value, mode){
    if(value === 'number' || value === 'text'){
      return(this.simpleInputChosen(key, value, mode))
    }else{ 
      if(Array.isArray(value)){
        return(this.dropDownChosen(key, value, mode))
      }else{
        if(value === 'radio'){
          return(this.radioButtonsChosen(key, value, mode))
        }
      }
    }
  }

  simpleInputChosen(key, value, mode){
    return (
      <input
        className="column input"
        name={key}
        type={(Number.isInteger(value)) ? "number" : "text"}
        onChange={(e) => this.handleChange(e, mode)} />
    )
  }

  dropDownChosen(key, value, mode){
        return (
          <select 
            onChange={(e) => this.handleChange(e, mode)}
            className="column input"
            ref={this._DropDown}
            name={key}   
          >
            {value.map((elem, i) => {  
              return (<option className="option" value={elem} key={elem} >{elem}</option>) 
            })}
          </select>
        )
  }

  radioButtonsChosen(key, value, mode){
    return (
      <div className="column input" 
        onChange={(e) => this.handleChange(e, mode)} >
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

  populateForm(mode){
    let param_dict = this.state.answer.default_params[mode]

    return(
      <React.Fragment>
        {Object.entries(param_dict).map(([key, value]) => (
        <div
          key={key}
          className="row">
          <p className="column label">
            {key.charAt(0).toUpperCase() + key.slice(1) + ': '}
          </p>
          {this.chooseInput(key, value, mode)}
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
            ref={this.Popup}
            closePopup={this.togglePopup} 
          />  
          : null  
        }
        
        <form className="form" onSubmit={this.handleSubmit}>
          {this.populateForm(req)}
          {this.state.optional ?
            this.populateForm(opt)
            : null
          }
          <input className="submit" type="submit" value="Submit" ref={this._Submit}/>
        </form>

        <br />
        <span>Switch between Simple/Advanced Form</span><br />
        <Switch 
          className="switch"
          onChange={this.reverseOptional} 
          checked={this.state.optional} />
      </div>
    );
  }
}

export default Form;
