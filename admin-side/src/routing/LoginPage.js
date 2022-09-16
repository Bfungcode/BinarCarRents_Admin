import React from "react";
import LoginForm from "../features/LoginForm";
import '../styles/LoginForm.css';


const LoginPage = () => {
  return (
    <div className="maincontainer">
          <div className="WPContainer"> 
            <img src='./img/wallpaperadmin.png' alt="wallpaper here" className="wallpaperadmin"/>
          </div>
          
          <div className="form-container"> 
            <LoginForm /> 
            </div>
      
    </div>
  )
}

export default LoginPage