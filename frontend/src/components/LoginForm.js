import React, { useState} from "react";
import logo from "../images/logo.png";
import authenticate from "../services/auth";
import { useNavigate } from "react-router-dom";
import fabric from "../images/fabric.png"

const URL = "/api/user/login";

const LoginForm = () => {
  const [response, setResponse] = useState();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setResponse("");
    const { name, value } = e.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      try {
        await authenticate.login(loginData.email.toLowerCase(), loginData.password, URL).then((res)=>{
         if(res.status !==400) {
             navigate("/menu")
            window.location.reload();
            setLoginData({
                email: "",
                password: "",
              });
            }else{
                setResponse(res?.message)
            }
        },(err)=>{
            console.log("post err",err);
        }
        )
        // if (res?.status === 400) {
        //   setResponse(res?.message);
        //   console.log("res", res);
        // } 
       
        
      } catch (error) {
        console.log("errr", error);
      }
    } else {
      console.log("please enter credentials");
      setResponse("Email or password is missing");
    }
  };

  return (
    <div className="login-form" style={{backgroundImage:`url(${fabric})`}}>
      <div className="logo">
        <img src={logo} alt="Reastaurant-logo" />
      </div>

      <form onSubmit={onSubmit}>
          {/* <h1>SULO EINLOGGEN</h1> */}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="pwd">Passwort:</label>
        <input
          type="password"
          id="pwd"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        {response ? <p className="error-message">{response}</p> : null}
        <button type="submit">EINLOGGEN</button>
      </form>
    </div>
  );
};

export default LoginForm;
