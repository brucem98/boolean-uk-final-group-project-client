import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Home from './Pages/Home';
import { useEffect, useState } from "react"

import Competition from "./Pages/Competition";

function App() {

  const [competitions, setCompetitions] = useState([])

  function getCompetition() {
    const url = `${process.env.REACT_APP_FETCH_URL}/competition`;
    fetch(url)
      .then((res) => res.json())
      .then((Data) => {
        console.log(Data)
        setCompetitions(Data.data)
      })
  }

  useEffect(() => {
    getCompetition()
  }, [])
  console.log("competitions", competitions)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home competitions={competitions} />}/>
        <Route exact path="/competition/:id" element={<Competition />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
