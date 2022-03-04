import { useState } from "react";
import SingleTicket from "./SingleTicket";
import "./Css_pages/tickets.css";

function Tickets({ competitions, tickets, setTickets }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  //state for edit form - intermediary, holds data during transaction

  console.log({
    firstName: firstName,
    lastName: lastName,
    email: email,
    vaccinated: vaccinated,
    selectedCompetition: selectedCompetition,
    tickets: tickets,
  });

  const handleFilterByCompetition = (event) => {
    setSelectedCompetition(parseInt(event.target.value));
  };
  // {
  //   competitions.filter((competition) => {
  //     if (selectedCompetition === competition.exhibitionName) {
  //       return competition.id;
  //     }
  //   });
  // }

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleVaccinated = (event) => {
    setVaccinated(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const ticketToCreate = {
      firstName,
      lastName,
      email,
      vaccinated,
      competitionId: selectedCompetition,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketToCreate),
    };
    const url = `${process.env.REACT_APP_FETCH_URL}/tickets`;
    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((newTicket) => {
        console.log({ newTicket: newTicket });
        console.log("this tickets", tickets);
        setTickets([...tickets, newTicket.data]);
      });
  };

  const displayCompetitionDetails = competitions.map((competition) => {
    return (
      <li className="ticket-prices-list">
        <img src={competition.img} alt="Competitions" />
        <div>
          <p>
            Competition: <b>{competition.exhibitionName}</b>
          </p>
          <p>
            Price: <b>£{competition.ticketPrice}</b>
          </p>
        </div>
      </li>
    );
  });

  const displayTicketsList = tickets.map((ticket) => {
    const displayCompetitions = ticket.competitions
      ? ticket.competitions.map((competition) => {
          return (
            <li>
              <p>{competition.exhibitionName}</p>
              <li>
                <b>Ticket Price:</b> <em>£{competition.ticketPrice}</em>
              </li>
              <li>
                <b>Event Location:</b> <em>{competition.location}</em>
              </li>
              <li>
                <b>Event Date:</b> <em>{competition.date}</em>
              </li>
            </li>
          );
        })
      : null;
    return (
      <SingleTicket
        ticket={ticket}
        competitions={competitions}
        competition={displayCompetitions}
      />
    );
  });
  return (
    <>
      <div>
        <header className="ticket-header">
          <h2>Ticket Purchase</h2>
        </header>
        <img
          className="main-ticket-img"
          src="https://cdn1.matadornetwork.com/blogs/1/2019/05/Dog-holding-a-ticket-at-K9-Cinemas-in-Plano-Texas-940x626.jpg"
          alt="Dog Holding Ticket with Mouth"
        />
      </div>
      <main className="ticket-spacer main-five-column-grid">
        <div></div>
        <div className="ticket-sections">
          <h3 className="ticket-h3">Ticket Prices</h3>
          <ul>{displayCompetitionDetails}</ul>
        </div>
        <form className="ticket-sections" onSubmit={handleSubmit}>
          <h3 className="ticket-h3">Ticket Form</h3>
          <div className="ticket-form-main">
          <select
            onChange={handleFilterByCompetition}
            name="filter-by-competition"
            id="filter-by-competition"
            className=""
          >
            <option value=""> Select Competition</option>
            {competitions.map((comp) => (
              <option value={comp.id}>{comp.exhibitionName}</option>
            ))}
          </select>

          <div className="">
            <label for="firstName">First Name:</label>
          </div>
          <input
            className=""
            id="name"
            name="first-name"
            type="text"
            placeholder="Enter first name..."
            onChange={handleFirstName}
            value={firstName}
          />
          <div className="">
            <label for="lastName">LastName:</label>
          </div>
          <input
            className=""
            id="lastName"
            name="last-name"
            type="text"
            placeholder="Enter last name..."
            onChange={handleLastName}
            value={lastName}
          />
          <div className="">
            <label for="email">Email:</label>
          </div>
          <input
            className=""
            id="email"
            name="email"
            type="email"
            placeholder="Enter email..."
            onChange={handleEmail}
            value={email}
          />
          <div className="">
            <input
              id="vaccinated"
              name="vaccinated"
              type="checkbox"
              onChange={handleVaccinated}
              checked={vaccinated}
            />
            <label for="checkbox">Vaccinated</label>
          </div>
          <div>
            <button className="" type="submit">
              Buy Ticket
            </button>
          </div>
        </div>
        </form>
        
        <div className="ticket-sections">
          <h3 className="ticket-h3">Ticket List</h3>
          <ul>{displayTicketsList}</ul>
        </div>
        {/* <EditTicketForm competitions={competitions} ticketToEdit={ticketToEdit}  /> */}
        <div></div>
      </main>
      <footer></footer>
    </>
  );
}
export default Tickets;
