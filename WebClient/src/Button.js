import React, { Component } from 'react';
class Button extends Component {
    render() {
        return (
            <div>
                <button 
                onClick={this.props.handler}>
                Show Form
                </button>
            </div>
        );
    }
}
export default Button;