import React, { Component } from 'react';
import Form from './Form';
import Button from './Button';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true,
        };
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onButtonClick() {
        this.setState({
            value: !this.state.value
        })
    }

    render() {
        return (
            <div>
                <p>
                    Welcome to Bank App
                </p>
                {this.state.value ?
                    <Button handler = {this._onButtonClick} /> :
                    <Form handler = {this._onButtonClick}/>
                }
            </div>
        );
    }
}
export default Start;

