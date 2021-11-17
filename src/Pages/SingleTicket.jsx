function SingleTicket(props) {
    const {firstName, lastName, vaccinated, competition, id } = props.ticket
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
        <li key ={id}>
        <h3>{competition.exhibitionName}</h3>
        <li>Ticket Price: £{competition.ticketPrice}</li>
        <li>Event Location: {competition.location}</li>
        <li>Event Date: {competition.date}</li>
        <li>First Name: {firstName}</li>
        <li>Last Name: {lastName}</li>
        <li>Vaccination Status: {String(vaccinated)}</li>
        <img src= "https://www.seekpng.com/png/detail/48-486207_ticket-icon-tickets-vector-icon.png" alt="Ticket"/>
        <button onClick={handleTicketDelete}>
            Remove Ticket
        </button>
      </li>
    )
}

export default SingleTicket;