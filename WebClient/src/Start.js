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
  }

  handleButtonClick(_optional) {
    this.setState({
      value: !this.state.value,
      optional: _optional
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <p className="form-title">
          Fill all the fields below
        </p>
        <Form
          optional={this.state.optional}
          handler={this.handleButtonClick} />
      </React.Fragment>
    )
  }

  renderIntro() {
    return (
      <React.Fragment>
          <p className="intro-text">Welcome to</p>
          <p className="intro-text">Term Deposit Prognosticator</p>
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
        {this.state.value ? this.renderIntro() : this.renderForm()}
      </div>
    );
  }
}

export default Start;
