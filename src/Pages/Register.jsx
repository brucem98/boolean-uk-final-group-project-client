import { useState } from "react";
import "./Css_pages/register.css";
import SingleDog from "./SingleDog";

function Register({ competitions, dogs, setDogs }) {
  // dog
  const [selectedBreed, setSelectedBreed] = useState("");
  //   competitionId
  const [selectedCompetition, setSelectedCompetition] = useState("");
  // const [dogToDelete, setDogToDelete] = useState();

  // Dog details
  const [name, setName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [breed, setBreed] = useState("");
  const [img, setImg] = useState("");
  const [shotStatus, setShotStatus] = useState(false);
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
    selectedBreed: selectedBreed,
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
  const handleDogBreed = (event) => {
    console.log({ handleDogBreed: event.target.value });
    setSelectedBreed(event.target.value);
  };
  // const handleReset = (event) => {
  //   event.preventDefault()
  //   setName("");
  //   setPetAge("");
  //   setBreed("");
  //   setImg("");
  //   setShotStatus(false);
  //   setFirstName("");
  //   setLastName("");
  //   setAge("");
  //   setVaccinated(false);
  // };

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
        setDogs([...dogs, newDogOnParticipant]);
      });
  };

  // const item = this.items.find((item) => item.id === id);
  //   //find the index of the item in the list
  //   let index = this.items.indexOf(item)
  //   //remove from the list one elementsatrting at that index
  //   this.items.splice(index, 1)
  //   // return the list
  //   return this.items

  // const handleDelete = () => {
  //   fetch(`http://localhost:3030/users/${id}`, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then(() => {
  //       const updatedUsers = users.filter((user) => user.id !== id);
  //       setDogToDelete(dogToDelete);

  //       history.push("/users");
  //     });
  // };

  const filteredNewDogs = dogs.sort().filter((dog) => {
    return dog.competitions.filter((comp) => {
      console.log({ insideFilter: comp, dog });
      if (
        selectedBreed === dog.breed.toLowerCase().includes(comp) ||
        selectedBreed === ""
      ) {
        return true;
      } else {
        return false;
      }
    });
  });
  console.log({ filteredNewDogs: filteredNewDogs });
  const DisplayDogs = filteredNewDogs.map((dog, key) => {
    const displayCompetitions = dog.competitions
      ? dog.competitions.map((comp) => <p>{comp.exhibitionName}</p>)
      : null;
    console.log({ displayCompetitions: displayCompetitions });
    return (
      <SingleDog
        dog={dog}
        key={key}
        displayCompetitions={displayCompetitions}
      />
    );
  });
  const breeds = new Set(dogs.map((dog) => dog.breed));
  return (
    <>
      <header>
        <h1>Register for Competition Here</h1>
      </header>
      <section className="dog-select">
        <select
          onChange={handleDogBreed}
          name="filter-by-dog-breed"
          id="filter-by-dog-breed"
          className="input select-input"
        >
          <option value=""> Select Dog breed....</option>
          {[...breeds].sort().map((breed) => (
            <option className="form-label" value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </section>
      <section className="two-column-grid-reg">
        <div>
          <ul className="three-column-grid-reg scroll">{DisplayDogs}</ul>
        </div>
        <section className="reg-form">
          <form onSubmit={handleSubmit}>
            <select
              onChange={handleFilterByCompetition}
              name="filter-by-competition"
              id="filter-by-competition"
              className="input select-input"
            >
              <option value=""> Select Competition</option>
              {competitions.map((comp) => (
                <option className="form-label" value={comp.id}>
                  {comp.exhibitionName}
                </option>
              ))}
            </select>
            <h2 className="form-label">Pet Section</h2>
            <div className="">
              <label className="form-label" for="name">
                Name:
              </label>
            </div>
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              placeholder="Enter pet's name..."
              onChange={handlePetName}
              value={name}
            />
            <div className="">
              <label className="form-label" for="age">
                Age:
              </label>
            </div>
            <input
              className="input"
              id="age"
              name="age"
              type="number"
              placeholder="Enter pet's age..."
              onChange={handlePetAge}
              value={petAge}
            />
            <div className="">
              <label className="form-label" for="breed">
                Breed:
              </label>
            </div>
            <input
              className="input"
              id="breed"
              name="breed"
              type="text"
              placeholder="Enter pet's breed..."
              onChange={handlePetBreed}
              value={breed}
            />
            <div className="">
              <label className="form-label" for="img">
                Image:
              </label>
            </div>
            <input
              className="input"
              id="img"
              name="img"
              type="text"
              placeholder="Add pet's image..."
              onChange={handlePetImage}
              value={img}
            />
            <div className="">
              <input
                className="checkbox"
                id="shotStatus"
                name="shotStatus"
                type="checkbox"
                placeholder="Enter pet's shot status..."
                onChange={handlePetShotStatus}
                value={shotStatus}
              />
              <label className="form-label" for="shotStatus">
                Shot Status
              </label>
            </div>
            <h2 className="form-label">Participant Section</h2>
            <div className="">
              <label className="form-label" for="firstName">
                First Name:
              </label>
            </div>
            <input
              className="input"
              id="FirstName"
              name="firstName"
              type="text"
              placeholder="Enter first name..."
              onChange={handleFirstName}
              value={firstName}
            />
            <div className="">
              <label className="form-label" for="lastName">
                LastName:
              </label>
            </div>
            <input
              className="input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name..."
              onChange={handleLastName}
              value={lastName}
            />
            <div className="">
              <label className="form-label" for="age">
                Age:
              </label>
            </div>
            <input
              className="input"
              id="age"
              name="age"
              type="number"
              placeholder="Enter age..."
              onChange={handleParticipantAge}
              value={age}
            />
            <div className="checkbox">
              <input
                className=""
                id="vaccinated"
                name="vaccinated"
                type="checkbox"
                onChange={handleVaccinated}
                checked={vaccinated}
              />
              <label className="form-label" for="checkbox">
                Vaccinated
              </label>
            </div>
            <div>
              <button className="reg-btn" type="submit">
                Register
              </button>
              {/* <button onClick={handleReset} className="reg-btn" type="reset">
                Reset
              </button> */}
            </div>
          </form>
        </section>
      </section>
      <footer></footer>
    </>
  );
}

export default Register;
