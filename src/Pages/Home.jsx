import { useEffect, useState } from "react"
import {useNavigate}  from "react-router-dom"

function Home(props) {
    const navigate = useNavigate();
    function handleClick (event, competition) {
        event.preventDefault()
        navigate(`/competition/${competition.id}`)
    }
    const competitions = props.competitions.map((competition, index) => {
        return (
            <li key={index}>
                <h3>{competition.exhibitionName}</h3>
                <p>Date: {competition.date}</p>
                <p>Location: {competition.location}</p>
                <p>Difficulty: {competition.difficulty}</p>
                <p>Prize Pool: {competition.prizePool}</p>
                <p>Capacity: {competition.capacity}</p>
                <img src={competition.img} alt="Competition Image" />
                <button onClick = {(event)=>handleClick(event, competition)}>More Details</button>
            </li>
        )
    })

    return (
        <>
            <header>
                <h1>Dog Shows</h1>
            </header>
            <main>
                <section>
                    <h2>List of all upcoming dog competitions:</h2>
                    <p>*FILTER COMPETITION BY DIFFICULTY HERE*</p>
                </section>
                <section>
                    <ul>
                        {competitions}
                    </ul>
                </section>
            </main>
        </>
    )
}

export default Home