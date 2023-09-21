import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/Homepage.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from "../components/Button";
import Taglist from "../components/Taglist";

const Homepage = () => {
  const { logoutUser, user } = UserAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="greeting">
        <p>Hello, { user.email }! </p>
        <Button 
          className="button logout"
          text="Logout"
          onClick={() => {
            logoutUser();
            navigate('/');
          }} />
      </div>

      <Header className="header homepage-header" text="Meltdown Tracker"/>

      <div className="main">
        <Taglist className="tag-wrapper" />

        <div className="buttons">
          <Button 
            className="button big-button"
            text="See all Entries" 
            onClick={() => navigate('/entries')} />

          <Button 
            className="button big-button"
            text="Add New Entry" 
            onClick={() => navigate('/submission')} />
        </div>
      </div>
      <Footer className="footer" text="© 2023 Meltown Tracker"/>
    </div>
  )
}

export default Homepage;