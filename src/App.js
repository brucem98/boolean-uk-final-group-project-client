import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import reactDom from 'react-dom';
import Home from './Pages/Home';
import { useEffect, useState } from "react"

function App() {

  const [competitions, setCompetitions] = useState([])

  function getCompetition() {
    const url = `http://localhost:3030/competition`;
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
        <Route exact path="/" element={<Home competitions={competitions} />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
