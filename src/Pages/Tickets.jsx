function Tickets (props) {
const tickets = props.tickets

const listOfTickets = tickets.map(ticket => {
return (
    <li>
        <h2>Ticket</h2>
        <p>Price: £{ticket.price}</p>
        <p>Ticket Number: {ticket.ticketNumber}</p>
    </li>
)
})
return (
    <>
    <ul>
        {listOfTickets}
    </ul>
    </>
)
}

export default Tickets