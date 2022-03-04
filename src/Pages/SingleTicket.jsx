import { useState } from "react";
import EditTicketForm from "./EditTicketForm";

function SingleTicket(props) {
    const {ticket, competitions, competition} = props
    const {firstName, lastName, vaccinated, email, id } = ticket
    
    const [isEditing, setIsEditing] = useState(false);
        console.log("props in singleticket: ", props)

        // const handleDelete = (id) => {
        //     fetch(`${process.env.REACT_APP_FETCH_URL}/taxis/${id}`, {
        //       method: "DELETE",
        //     })
        //       .then((res) => res.json())
        //       .then(() => {
        //         const updatedTaxis = taxis.filter((taxi) => taxi.id !== id);
        //         setTaxis(updatedTaxis);
        //       });
        //   };
        

    const handleTicketDelete = () => {

        const fetchTicketToDelete = {
            method: "DELETE",
        }
        const delUrl =`${process.env.REACT_APP_FETCH_URL}/tickets/${id}`
        
        console.log("Inside ticket delUrl: ", delUrl)

        fetch(delUrl, fetchTicketToDelete)
         .then((res) => res.json())
    }
        
    return(
        <>
        <li key ={id} className="tickets-list ticket">
        <div>
        <ul>{competition}</ul>
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