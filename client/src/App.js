import './App.css';
import React, { useEffect, useState } from 'react';
import Axios from "axios";

const App = () => {  
  const path = "http://localhost:3000/";
  //const curScreen = "/loginData";
  const [screen, setScreen] = useState();
  const getScreen = async() => {
    const response = await Axios.get(path);
    setScreen(response.screen);  
  }
  
  useEffect(() => {
    getScreen()
  }, []);

  return (
    
    <div dangerouslySetInnerHTML={{__html: screen}}>
    
      </div>
  )
  
};


export default App;
