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
    // const handleTicketEdit = (event) =>{
    //     console.log("Handler Edit: ", props.ticket)
    //     setTicketToEdit(ticket)
    // }

    // useEffect keeps track of the changes in the component, if ticketToEdit changes run this function 
    useEffect(()=> {
        if (ticketToEdit) {
            // setFirstName(ticketToEdit.firstName)
        }
    }, [ticketToEdit])

    
    return(
        <>
        <li key ={id} className="tickets-list" className="ticket">
        <div>
        <h2>{competition.exhibitionName}</h2>
        <li><b>Ticket Price:</b> <em>£{competition.ticketPrice}</em></li>
        <li><b>Event Location:</b> <em>{competition.location}</em></li>
        <li><b>Event Date:</b> <em>{competition.date}</em></li>
        <li><b>Name:</b> <em>{firstName} {lastName}</em></li>
        <li><b>Email:</b> <em>{email}</em></li>
        <li><b>Vaccination Status:</b> <em>{String(vaccinated)}</em></li>
        </div>
        <div>
        <button className="ticket-delete-button" onClick={handleTicketDelete}>
            Remove Ticket
        </button>
        <button className="ticket-edit-button" onClick={() => setIsEditing(!isEditing)}>
            Edit Ticket
        </button>
        </div>
      </li>
      {isEditing && <EditTicketForm competitions={competitions} ticket={ticket}/>}
      </>
    )
}

export default SingleTicket;