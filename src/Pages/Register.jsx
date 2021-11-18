import { useState } from "react";

function Register({ competitions, dogs, setDogs }) {
  //   competitionId
  const [selectedCompetition, setSelectedCompetition] = useState("");

  // Dog details
  const [name, setName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [breed, setBreed] = useState("");
  const [img, setImg] = useState("");
  const [shotStatus, setShotStatus] = useState("");
  // Participant details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [vaccinated, setVaccinated] = useState(false);

  console.log({
    name: name,
    Age: parseInt(petAge),
    breed: breed,
    img: img,
    shotStatus: shotStatus,
    firstName: firstName,
    lastName: lastName,
    age: age,
    vaccinated: vaccinated,
    selectedCompetition: selectedCompetition,
  });

  const handleFilterByCompetition = (event) => {
    setSelectedCompetition(parseInt(event.target.value));
  };
  //   Dog
  const handlePetName = (event) => {
    setName(event.target.value);
  };
  const handlePetAge = (event) => {
    setPetAge(event.target.value);
  };
  const handlePetBreed = (event) => {
    setBreed(event.target.value);
  };
  const handlePetImage = (event) => {
    setImg(event.target.value);
  };
  const handlePetShotStatus = (event) => {
    setShotStatus(event.target.checked);
  };
  //   participant
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleParticipantAge = (event) => {
    setAge(event.target.value);
  };
  const handleVaccinated = (event) => {
    setVaccinated(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const dogOnParticipantToCreate = {
      competitionId: selectedCompetition,
      name,
      petAge: parseInt(petAge),
      breed,
      img,
      shotStatus,
      participant: {
        firstName,
        lastName,
        age,
        vaccinated,
      },
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogOnParticipantToCreate),
    };
    const url = `${process.env.REACT_APP_FETCH_URL}/dogs`;
    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((newDogOnParticipant) => {
        console.log({ NewDogInsideFetch: newDogOnParticipant });
        console.log("newDog", dogs);
        setDogs({ ...dogs, newDogOnParticipant });
      });
  };

//   const DisplayDogs = dogs.map((dog) => {
    // const displayCompetitions = dog.competitions.map((comp) => (
    //   <p>{comp.exhibitionName}</p>
    // ));
//     console.log({ dogMap: dog });
//     return (
//       <li>
//         <h3>Name: {dog.name}</h3>
//         <p>Breed: {dog.breed}</p>
//         <p>Age: {dog.petAge}</p>
//         <p>Shot: {dog.shotStatus.toString()}</p>
//         <h3>First Name: {dog.participant.firstName}</h3>
//         <h3>Last Name: {dog.participant.lastName}</h3>
//         {/* <h3>Event: {displayCompetitions}</h3> */}
//         <img src={dog.img} alt="dogs" />
//       </li>
//     );
//   });
  return (
    <>
      <header>
        <h1>Register for Competition Here</h1>
      </header>
      <form className="" onSubmit={handleSubmit}>
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
        <h2>Pet Section</h2>
        <div className="">
          <label for="name">Name:</label>
        </div>
        <input
          className=""
          id="name"
          name="name"
          type="text"
          placeholder="Enter pet's name..."
          onChange={handlePetName}
          value={name}
        />
        <div className="">
          <label for="age">Age:</label>
        </div>
        <input
          className=""
          id="age"
          name="age"
          type="number"
          placeholder="Enter pet's age..."
          onChange={handlePetAge}
          value={petAge}
        />
        <div className="">
          <label for="breed">Breed:</label>
        </div>
        <input
          className=""
          id="breed"
          name="breed"
          type="text"
          placeholder="Enter pet's breed..."
          onChange={handlePetBreed}
          value={breed}
        />
        <div className="">
          <label for="img">Image:</label>
        </div>
        <input
          className=""
          id="img"
          name="img"
          type="text"
          placeholder="Add pet's image..."
          onChange={handlePetImage}
          value={img}
        />
        <div className="">
          <label for="shotStatus">Shot Status:</label>
        </div>
        <input
          className=""
          id="shotStatus"
          name="shotStatus"
          type="checkbox"
          placeholder="Enter pet's shot status..."
          onChange={handlePetShotStatus}
          value={shotStatus}
        />
        <h2>Participant Section</h2>
        <div className="">
          <label for="firstName">First Name:</label>
        </div>
        <input
          className=""
          id="FirstName"
          name="firstName"
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
          name="lastName"
          type="text"
          placeholder="Enter last name..."
          onChange={handleLastName}
          value={lastName}
        />
        <div className="">
          <label for="age">Age:</label>
        </div>
        <input
          className=""
          id="age"
          name="age"
          type="number"
          placeholder="Enter age..."
          onChange={handleParticipantAge}
          value={age}
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
            Register
          </button>
        </div>
      </form>
      {/* <ul>{DisplayDogs}</ul> */}
    </>
  );
}

export default Register;
