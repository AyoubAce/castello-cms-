import React, { useContext , useEffect} from "react";
import LoginForm from "../components/LoginForm";
import house from "../images/house.jpg";
import { ContextApi } from "../components/ContextApi";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const {user}= useContext(ContextApi);
  const navigate = useNavigate()
 
  useEffect(() => {
  if(user){
    navigate("/menu")
  }  
  })
  
  return (
    <section className="login-container">
      <LoginForm />
      <div className="image">
        <div className="overlay">
          <div>
            <h1>ITALIAN RESTAURANT</h1>
            <p>Kamp LintFort</p>
          </div>
        </div>
        <img src={house} alt="restaurant" />
      </div>
    </section>
  );
};

export default Login;
