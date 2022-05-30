import React from "react";
import "./LoginPopup.css"
import LoginForm from "../Form/LoginForm";

const LoginPopup = props => {
    return (
        <div className="login-popup-page">
            <span className ="close-icon" onClick={props.onClick}>&#10006;</span>
            {<LoginForm/>}
        </div>
    )
}

  export default LoginPopup;