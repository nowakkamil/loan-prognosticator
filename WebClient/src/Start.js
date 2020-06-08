import React, { Component } from "react";
import Form from "./Form";
import Button from "./Button";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      optional: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this._Form = React.createRef();
  }

  handleButtonClick(_optional) {
    this.setState({
      value: !this.state.value
    });
  }

  renderForm(){
    return(
      <React.Fragment>
        <p className="form-title">
          Fill all the fields below
        </p>
        <Form 
          ref={this._Form}
          handler={this.handleButtonClick} />
      </React.Fragment>
    )
    // this._Form.current.changeOptional(_optional)
  }

  renderButtons(){
    return(
      <React.Fragment>
        <p>Welcome to Bank App</p>
        <Button 
            handler={this.handleButtonClick}
            optional={false}
            text="Show Simple Form" />
        <Button 
            handler={this.handleButtonClick}
            optional={true}
            text='Show Advanced Form' />
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="intro">
        {this.state.value ? 
          this.renderButtons()
          : 
          this.renderForm()
        }
      </div>
    );
  }
}
export default Start;
