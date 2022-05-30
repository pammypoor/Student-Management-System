import React from "react";
import axios from 'axios';
import Button from "../Button/Button";

import "./RegistrationForm.css";

class RegistrationForm extends React.Component  {
    state = {
        email: '',
        passphrase: '',
        errorMessage: '',
        agreement: false
    }

    handleInput() {
        // [username]@[domain name].[domain]
        // Username: a-z, A-Z, 0-9, ._-
        // Domain Name: a-z, A-Z, 0-9, .-
        // Domain: a-z, A-Z
        // Satisfy all three requirements
        var regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$");    
        
        //  passphrase: a-z, A-Z, 0-9, .,@! space
        var regexPassphrase = new RegExp("^[a-zA-Z0-9.,@!\s]+$");

        if(this.state.agreement === false){
            this.setState({errorMessage: 'Must agree to terms to create account'});
            return false;
        }

        if(this.state.passphrase.length < 8){
            this.setState({errorMessage: 'Password must be at least 8 characters'});
            return false;
        }

        if(!regexEmail.test(this.state.email)){
            this.setState({errorMessage: 'Invalid email'});
            return false;
        }

        if(!regexPassphrase.test(this.state.passphrase)){
            this.setState({errorMessage: 'Your password can only contain: \nblank space\na-z\nA-Z\n.,@!'});
            return false;
        }
        return true; 
    }

    inputEmailHandler = (e) => {
        let updatedEmail = e.target.value;
        this.setState({ email: updatedEmail});
    }

    inputPassphraseHandler = (e) => {
        let updatedpassphrase = e.target.value;
        this.setState({ passphrase: updatedpassphrase});
    }

    hashInput = (value) => {
        var pbkdf2 = require('pbkdf2');      
        const pbkdfKey = pbkdf2.pbkdf2Sync(value, '',  10000,  64, 'sha512');
        return pbkdfKey.toString('hex').toUpperCase();
    }


    inputCheckboxHandler = (e) => {
        let updatedAgreement = !this.state.agreement;
        this.setState({agreement: updatedAgreement});
    }

    

    onSubmitHandler = (e) => {
        e.preventDefault();

        // pbkdf2 uses callbacks not promises, need to wrap in a promise object

        if(this.handleInput()){
            this.setState({errorMessage: ''})
        }
    }

    render() {
        const renderForm = (
            <div className="form-register-container">
                 <form className="register-form" onSubmit = {this.onSubmitHandler}>
                        <div className="input-container">
                            <input type="text" value={this.state.email} required placeholder="Email Address" onChange = {this.inputEmailHandler}/>
                        </div>
                        <div className="input-container">
                            <input type="password" value={this.state.passphrase} required placeholder="Password" onChange = {this.inputPassphraseHandler}/>
                        </div>
                        <div className="register-input-checkbox">
                            <label>
                                <input type = "checkbox" checked={this.state.agreement} onChange={this.inputCheckboxHandler}/> 
                                I agree to the <a href = "/Register/EULATerms" target="_blank">terms and conditions</a>
                            </label>
                        </div>
                        <div className="create-button-container">
                            <Button type="button" color="green" name="Register"/>
                        </div>
                        {this.state.errorMessage && <div className="error-registration"> {this.state.errorMessage} </div>}
                    </form>
            </div>
        );

        return (
            <div className="form-register-wrapper">
                <div className="container-register-text">
                    <h1 className="register-title">Registration</h1>
                </div>
                {renderForm}
            </div>
        );
    }
}

export default(RegistrationForm);