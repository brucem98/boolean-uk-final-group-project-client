import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Css_pages/competition.css"

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
        <h3 className="comp-text">Name: {filteredDog.name}</h3>
        <p className="comp-text"> Breed: {filteredDog.breed}</p>
        <p className="comp-text"> Age: {filteredDog.petAge}</p>
        <p className="comp-text"> Shot: {filteredDog.shotStatus.toString()}</p>
        <img className="competition-img" src={filteredDog.img} alt="dogs" />
      </li>
    );
  });
  return (
    <>
      <header>
        <h1>{competitionTitle.exhibitionName}</h1>
      </header>
      <aside className="two-column-grid ">
        <>
        <button className="comp-btn" onClick={handleClick}>Buy Tickets</button>
        </>
        <button className="comp-btn" onClick={handleClick2}>Register for Competition</button>        
      </aside>
      <ul className="four-column-grid">{mappedDogs}</ul> 
      <footer></footer>     
    </>
  );
}

export default Competition;
