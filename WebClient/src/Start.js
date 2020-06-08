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
   // this._Form.current.changeOptional(_optional)
  }

  render() {
    return (
      <div className="intro">
        {this.state.value ? (
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
        ) : (
          <React.Fragment>
            <p className="form-title">
              Fill all the fields below
            </p>
            <Form 
              ref={this._Form}
              handler={this.handleButtonClick} />
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default Start;
