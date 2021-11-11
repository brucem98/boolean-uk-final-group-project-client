import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Home from './Pages/Home';
import { useEffect, useState } from "react"

import Competition from "./Pages/Competition";

function App() {

  const [competitions, setCompetitions] = useState([])
  const [dogs, setDogs] = useState([])

  function getCompetition() {
    const url = `${process.env.REACT_APP_FETCH_URL}/competition`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Incoming Competitions Data: ", data)
        setCompetitions(data.data)
      })
  }

  useEffect(() => {
    getCompetition()
  }, [])
  console.log("competitions", competitions)

  function getDog() {
    const url = `${process.env.REACT_APP_FETCH_URL}/dogs`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Incoming Dogs Data: ", data)
        setDogs(data.data)
      })
  }

  useEffect(() => {
    getDog()
  }, [])
  console.log("dogs", dogs)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home competitions={competitions} />} />
        <Route exact path="/competition/:id" element={<Competition dogs={dogs} />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
