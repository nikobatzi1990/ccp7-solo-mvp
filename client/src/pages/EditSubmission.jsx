import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import './styles/EditSubmission.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import TimeOfDay from "../components/TimeOfDay";
import LightBulb from "../components/LightBulb";
import IntensityLevel from "../components/IntensityLevel";

const EditSubmission = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const entryId = useParams();
  const [entry, setEntry] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [time, setTime] = useState("");
  const [intensity, setIntensity] = useState("not specified");
  const [isFlagged, setIsFlagged] = useState(false);
  const [classname, setClassname] = useState("");

  const editedData = {
    title: title, 
    body: body, 
    timeOfDay: time, 
    flagged: isFlagged
  };

  useEffect(() => {
    const fetchEntry = async () => {
      const fetchedEntry = await axios.get(`/api/entries/entry/${entryId.entryId}`);
      setEntry(fetchedEntry.data);
    }
    fetchEntry();
  }, []);

  useEffect(() => {
    setTitle(`${entry.title}`);
    setBody(`${entry.body}`);
    setTag(`${entry.tag_name}`);
    setTime(`${entry.time_of_day}`);
    setIsFlagged(`${entry.flagged}`);
    setIntensity(`${entry.intensity}`);
  }, [entry]);

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

  const handleInitialFlag = () => {
    if (isFlagged === true) {
      setClassname("filled material-symbols-outlined");
    } else {
      setClassname("material-symbols-outlined");
    }
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

  const handleSubmission = async () => {
    await axios.patch(`/api/entries/${entryId.entryId}/edit`, editedData);
    navigate('/entries');
  }

  useEffect(() => {
    handleInitialFlag();
  }, []);

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
              className={ classname }
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
              onClick={ handleSubmission }
              />

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
}

export default EditSubmission;