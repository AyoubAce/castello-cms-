import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export const ContextApi = createContext();

export const ContextProvider = (props) => {
  // const [auth, setAuth]= useState();
  const [menuChange, setMenuChange]= useState('')
  const [imgChange, setImgChange]= useState("")

  //get user from
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = () => {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  };
  
  // scroll top on changing page location
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  return <ContextApi.Provider value={{
    auth, user,
    menuChange,setMenuChange,
    imgChange, setImgChange,  
  }} >
    {props.children}
  </ContextApi.Provider>
}