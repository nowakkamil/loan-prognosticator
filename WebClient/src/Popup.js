import React, { Component } from "react";
import './Popup.css';  
import success from './img/success.svg';
import fail from './img/fail.svg'

class Popup extends Component { 
    
    constructor(props){
        super(props)
        this.state = {
            success: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ success: props.success })
      }

    render() {  
        return (  
            <div className='popup'>  
                <div className='popup\_inner'>  
                    {this.state.success ?  
                        <img src={success} alt="answer" className="answer-icon" /> 
                        : <img src={fail} alt="answer" className="answer-icon" /> 
                    }    
                    <br />
                    <button onClick={this.props.closePopup}>Close me</button>  
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;