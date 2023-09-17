import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/Submission.css";
import "./styles/Icons.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import TimeOfDay from "../components/TimeOfDay";
import IntensityLevel from "../components/IntensityLevel";
import LightBulb from "../components/LightBulb";

const Submission = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [time, setTime] = useState("");
  const [intensity, setIntensity] = useState("not specified");
  const [isFlagged, setIsFlagged] = useState(false);

  const submissionData = { 
    uid: user.uid, 
    tagName: tag, 
    timesUsed: 0, 
    title: title, 
    body: body, 
    timeOfDay: time, 
    flagged: isFlagged, 
    intensity: intensity 
  };

  const handleTitleInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setTitle(value);
  }

  const handleTextBody = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setBody(value);
  }

  const handleTagInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setTag(value);
  }

  const handleTimeOfDay = (event) => {
    event.preventDefault();
    const value = event.target.id;
    setTime(value);
  }

  const handleIntensity = (event) => {
    event.preventDefault();
    const value = event.target.id;
    setIntensity(value);
  }

  const handleFlag = (event) => {
    event.preventDefault();
    if (isFlagged === false) {
      event.target.className = "filled material-symbols-outlined"
      setIsFlagged(true);
    } else {
      event.target.className = "material-symbols-outlined"
      setIsFlagged(false);
    }
  }

  async function handleSubmission(event) {
    event.preventDefault();
    const previousTimesUsed = await axios.get(`/api/tags/${submissionData.tagName}/timesUsed`);
    submissionData.timesUsed = Number(previousTimesUsed.data) + 1;
    await axios.post('/api/entries/submission', submissionData);
    navigate('/entries');
  }

  return (
    <>
      <Header 
        className="header entries-header" 
        text="Meltdown Tracker"/>

      <div className="main-body">

        <TimeOfDay onClick={ handleTimeOfDay }/>
        <IntensityLevel onClick={ handleIntensity }/>
        
        <div className="submission">
          <div className="top">
            
            <LightBulb 
              className="material-symbols-outlined"
              onClick={ handleFlag }
              title="Was this a significant event?"
               />

            <Input 
              className="input title-input"
              placeholder="Title"
              value={ title }
              onChange={ handleTitleInput } />

            <Input 
              className="input"
              placeholder="Tag"
              value={ tag }
              onChange={ handleTagInput } />
          </div>
          
          <textarea 
            className="submission__body"
            placeholder="Type your entry here!"
            value={ body }
            cols="60" 
            rows="30" 
            onChange={ handleTextBody }>
          </textarea>

          <div className="submission__buttons">
            <Button 
              className="button"
              text="Submit" 
              onClick={ handleSubmission } />

            <Button 
              className="button"
              text="Back to Entries" 
              onClick={ () => {navigate('/entries')} } />
          </div>
        </div>
      </div>

      <Footer 
      className="footer" 
      text="© 2023 Meltown Tracker"/>
    </>
  );
};

export default Submission;