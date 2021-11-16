import { useState } from "react";
import SingleTicket from "./SingleTicket";

function Tickets({ competitions, tickets, setTickets }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState("");


  console.log({
    firstName: firstName,
    lastName: lastName,
    email: email,
    vaccinated: vaccinated,
    selectedCompetition: selectedCompetition,
    tickets: tickets
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
      <li>
        <img src={competition.img} alt="Competition_img" />
        <p>Price: £{competition.ticketPrice}</p>
      </li>
    );
  });

  const displayTicketsList = tickets.map((ticket) => {
    return(
     <SingleTicket ticket={ticket} />
    )
  
  })
  return (
    <>
      <h2>Tickets & Competitions</h2>
      <ul>{displayCompetitionDetails}</ul>
      <form className="" onSubmit={handleSubmit}>
        <h1>Ticket Form</h1>
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
          {/* <option value=""> Filter by competition</option>
          <option value="Doggie Olympics">Doggie Olympics</option>
          <option value="Highampresss">Highampresss</option>
          <option value="The Kennel Club">The Kennel Club</option>
          <option value="Puppy Face-Off">Puppy Face-Off</option> */}
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
      </form>
      <h2>Ticket List</h2>
      <ul>{displayTicketsList}</ul>
    </>
  );
}
export default Tickets;
