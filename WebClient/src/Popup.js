import React, { Component } from "react";
import './Popup.css';  
import success from './img/success.svg';
import fail from './img/fail.svg'

class Popup extends Component { 
    
    render() {  
        return (  
            <div className='popup'>  
                <div className='popup\_inner'>  
                    {this.props.success ?  
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