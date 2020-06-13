import React, { Component } from "react";
import './Popup.css';

import { ReactComponent as IconSuccess } from './img/success.svg';
import { ReactComponent as IconFailure } from './img/failure.svg';

import Button from '@material-ui/core/Button';

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false
    }
  }

  changeSuccess(successValue) {
    this.setState({
      success: successValue
    })
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          {this.state.success
            ? <IconSuccess className="answer-icon success" />
            : <IconFailure className="answer-icon failure" />}
          <p className="popup-text">
            Model predicted that this person
            <strong>
              {this.state.success ? " will " : " won't "}
            </strong>
            be interested in a term deposit
          </p>
          <Button
            className="button button-popup"
            color="primary"
            variant="contained"
            size="large"
            onClick={this.props.closePopup}>
            Fill again
          </Button>
        </div>
      </div>
    );
  }
}

export default Popup;
