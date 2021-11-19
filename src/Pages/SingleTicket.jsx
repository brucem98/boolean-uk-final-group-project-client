import { useEffect, useState } from "react";
import EditTicketForm from "./EditTicketForm";

function SingleTicket(props) {
    const {ticket, setTicketToEdit, ticketToEdit, competitions} = props
    const {firstName, lastName, vaccinated, competition, email, id } = ticket
    
    const [isEditing, setIsEditing] = useState(false);
        console.log("props in singleticket: ", props)

    const handleTicketDelete = () => {

        const fetchTicketToDelete = {
            method: "DELETE",
        };
        const delUrl =`${process.env.REACT_APP_FETCH_URL}/tickets${id}`
        
        console.log("Inside ticket delUrl: ", delUrl)

        fetch(delUrl, fetchTicketToDelete)
         .then((res) => res.json())
    };
        
    return(
        <>
        <li key ={id}>
        <h3>{competition.exhibitionName}</h3>
        <li>Ticket Price: £{competition.ticketPrice}</li>
        <li>Event Location: {competition.location}</li>
        <li>Event Date: {competition.date}</li>
        <li>Name: {firstName} {lastName}</li>
        <li>Email: {email} </li>
        <li>Vaccination Status: {String(vaccinated)}</li>
        <img src= "https://www.seekpng.com/png/detail/48-486207_ticket-icon-tickets-vector-icon.png" alt="Ticket"/>
        <button onClick={handleTicketDelete}>
            Remove Ticket
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>
            Edit Ticket
        </button>
      </li>
      {isEditing && <EditTicketForm competitions={competitions} ticket={ticket}/>}
      </>
    )
}

export default SingleTicket;