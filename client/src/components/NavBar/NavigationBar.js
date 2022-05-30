import React, { useState } from "react";
import LoginPopup from "../Popup/LoginPopup";
import RegistrationPopup from "../Popup/RegistrationPopup";
import Popup from "../Popup/Popup";

import './NavigationBar.css';

function NavigationBar() {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const NavToggleSignUp = () => {
        setIsSignUpOpen(!isSignUpOpen);
        if(isSignInOpen){
            setIsSignInOpen(!isSignInOpen);
        }
    }

    const NavToggleSignIn = () => {
        setIsSignInOpen(!isSignInOpen);
        if(isSignUpOpen){
            setIsSignUpOpen(!isSignUpOpen);
        }
    }

    const renderNav = (
        <nav className = "navbar-container">
           <ul className = "nav-links">
                <li className="logo"><a href="/" >logo</a></li>
                <li className="sec-link"><a href="/">About</a></li>
                <li className="sec"><span onClick={NavToggleSignUp}>Sign up</span></li>
                <li className="sec"><span onClick={NavToggleSignIn}>Sign In</span></li>
            </ul>
        </nav>
    );
   
  return (
    <div className="Home"> 
        {renderNav}
        {isSignUpOpen && <Popup content = {<RegistrationPopup onClick = {NavToggleSignUp}/> } />}
        {isSignInOpen && <Popup content = {<LoginPopup onClick = {NavToggleSignIn}/> } />}
    </div>
  );
}

export default NavigationBar;