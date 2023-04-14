import React, { useState, useEffect } from "react";
import "./SingleEntry.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Entry = () => {

  return (
    <>
      <Header className = "header" text = "Single Entry"/>
      <Footer className = "footer" text = "© 2023 Meltown Tracker"/>
    </>
  );
};

export default Entry;