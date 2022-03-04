import { useState } from "react";

function EditTicketForm({ competitions, ticket }) {
  const [firstName, setFirstName] = useState(ticket.firstName);
  const [lastName, setLastName] = useState(ticket.lastName);
  const [email, setEmail] = useState(ticket.email);
  const [vaccinated, setVaccinated] = useState(ticket.vaccinated);
  const [selectedCompetition, setSelectedCompetition] = useState(ticket.selectedCompetition);

  console.log("single ticket: ", ticket)

  console.log("EditTicketForm State Objects: ", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    vaccinated: vaccinated,
    selectedCompetition: selectedCompetition,
    id: ticket.id
  });

  const handleFilterByCompetition = (event) => {
    setSelectedCompetition(parseInt(event.target.value));
  };
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

    const ticketToUpdate = {
      firstName,
      lastName,
      email,
      vaccinated,
      competitionId: selectedCompetition
    }
    
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketToUpdate)
    };

  fetch(`${process.env.REACT_APP_FETCH_URL}/tickets/${ticket.id}`, fetchOptions)
    .then((res) => res.json())
    .then((updatedTicket) => {
      console.log("tickets PATCH request: ", updatedTicket)
  });
}


  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <h1>Edit Ticket Form</h1>
        <select
          onChange={handleFilterByCompetition}
          name="filter-by-competition"
          id="filter-by-competition"
          className=""
        >
          <option value=""> Select Competition</option>
          {competitions && competitions.map((comp) => (
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
            Edit Ticket
          </button>
        </div>
      </form>
    </>
  );
}
export default EditTicketForm;
