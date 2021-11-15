function Tickets (props) {
const competitions = props.competitions

const displayCompetitionDetails = competitions.map(competition => {
return (
    <li>        
        <img src={competition.img} alt="Competition_img" />
        <p>Price: £{competition.ticketPrice}</p>
    </li>
)
})
return (
    <>
    <h2>Tickets & Competitions</h2>
    <ul>
        {displayCompetitionDetails}      
    </ul>
    </>
)
}
export default Tickets