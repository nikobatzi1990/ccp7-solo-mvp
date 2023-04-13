import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from "../components/Button"

const Signup = () => {

  // const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <Header className = "header" text = "Signup"/>

      <div className="signup">
        <Input 
          htmlFor = "Email"
          className = "input"
          placeholder = "youremail@domain.com"
          value = { email }
          onChange = {(e) => {
            setEmail(e.target.value);
          }} />

        <Input 
          htmlFor = "Password"
          className = "input"
          placeholder = "your password"
          value = { password }
          onChange = {(e) => {
            setPassword(e.target.value);
          }} />

          <Button 
          className = "submit"
          type = "submit"
          text="Submit"
          />
      </div>

      <Footer />
    </>
  );
};

export default Signup;