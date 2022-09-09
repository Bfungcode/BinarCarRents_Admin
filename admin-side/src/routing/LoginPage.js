import React from "react";
import LoginForm from "../features/LoginForm";
import '../styles/LoginForm.css';


const LoginPage = () => {
  return (
    <div className="row container-fluid maincontainer">
          <div className="col-xl-8 WPContainer"> 
            <img src='./img/wallpaperadmin.png' alt="wallpaper here" className="wallpaperadmin"/>
          </div>
          
          <div className="col-xl-4 col-md-12 form-container"> 
            <LoginForm /> 
            </div>
      
    </div>
  )
}

export default LoginPage