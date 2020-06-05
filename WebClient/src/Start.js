import React, { Component } from "react";
import Form from "./Form";
import Button from "./Button";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({
      value: !this.state.value,
    });
  }

  render() {
    return (
      <div className="intro">
        {this.state.value ? (
          <React.Fragment>
            <p>Welcome to Bank App</p>
            <Button handler={this.handleButtonClick} />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <p className="form-title">
                Fill all the fields below
              </p>
              <Form handler={this.handleButtonClick} />
            </React.Fragment>
          )}
      </div>
    );
  }
}
export default Start;
