import React, { Component } from 'react';

class Button extends Component {

    render() {
        return (
            <div>
                <button onClick={() => this.props.handler(this.props.optional)}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}
export default Button;