import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react"
import Home from './Pages/Home';
import { useEffect, useState } from "react"
import Competition from "./Pages/Competition";
import Tickets from "./Pages/Tickets";
import Register from "./Pages/Register";

function App() {

  const [competitions, setCompetitions] = useState([])
  const [dogs, setDogs] = useState([])
  const [tickets, setTickets] = useState([])

  function getCompetition() {
    const url = `${process.env.REACT_APP_FETCH_URL}/competitions`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        
        setCompetitions(data.data)
      })
  }
  useEffect(() => {
    getCompetition()
  }, [])
  console.log("Fetch competitions", competitions)

  function getDog() {
    const url = `${process.env.REACT_APP_FETCH_URL}/dogs`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
       
        setDogs(data.data)
      })
  }
  useEffect(() => {
    getDog()
  }, [])
  console.log("Fetch dogs", dogs)

  function getTicket() {
    const url = `${process.env.REACT_APP_FETCH_URL}/tickets`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
       
        setTickets(data.data)
      })
  }
  useEffect(() => {
    getTicket()
  }, [])
  console.log("Fetch tickets", tickets)
  


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home competitions={competitions} />} />
        <Route exact path="/competitions/:id" element={<Competition competitions={competitions} dogs={dogs} />} />
        <Route exact path="/tickets" element={<Tickets tickets={tickets} setTickets={setTickets} competitions={competitions} />} />
        <Route exact path="/register" element={<Register competitions={competitions} dogs={dogs} setDogs={setDogs} />}/>
      </Routes>
    </BrowserRouter>
  );
}
 

export default App;
