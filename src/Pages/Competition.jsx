import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Competition({ dogs, competitions }) {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate(`/tickets`);
  }

  function handleClick2(event) {
    event.preventDefault();
    navigate(`/register`);
  }

  // const dogs = props.dogs;
  // const competitions = props.competitions;

  // console.log("props inside competition: ", props);
  // console.log("dogs in competition: ", dogs);
  // console.log("competitions in Competition", competitions);

  const { id } = useParams();
  const [competition, setCompetition] = useState();
  console.log("competition stateobject: ", competition);

  function getCompetition() {
    const url = `${process.env.REACT_APP_FETCH_URL}/competitions/${id}`;
    console.log("url: ", url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setCompetition(data.data);
      });
  }

  useEffect(() => {
    getCompetition();
  }, []);

  const competitionTitle = competitions.find(
    (competition) => competition.id === parseInt(id)
  );
  console.log("competitionTitle: ", competitionTitle);

  const filteredDogs = dogs.filter(
    (dog) =>
      dog.competitions.filter((comp) => comp.competitionId === parseInt(id))
        .length > 0
  );
  console.log("filtered dogs now: ", filteredDogs);
  const mappedDogs = filteredDogs.map((filteredDog) => {
    return (
      <li>
        <h3>Name: {filteredDog.name}</h3>
        <p>Breed: {filteredDog.breed}</p>
        <p>Age: {filteredDog.age}</p>
        <p>Shot: {filteredDog.shotStatus.toString()}</p>
        <img src={filteredDog.img} alt="dogs" />
      </li>
    );
  });
  return (
    <>
      <header>
        <h1>{competitionTitle.exhibitionName}</h1>
      </header>
      <aside>
        <button onClick={handleClick}>Buy Tickets</button>
        <button onClick={handleClick2}>Register for Competition</button>
      </aside>
      <ul>{mappedDogs}</ul>
    </>
  );
}

export default Competition;
