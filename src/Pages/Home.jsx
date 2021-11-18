import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Css_pages/home.css";

function Home(props) {
  const navigate = useNavigate();
  const [selectedCompetition, setSelectedCompetition] = useState("");
  console.log({ selectedCompetition: selectedCompetition });

  function handleClick(event, competition) {
    event.preventDefault();
    navigate(`/competitions/${competition.id}`);
  }
  const handleFilterByCompetitionLevel = (event) => {
    setSelectedCompetition(event.target.value);
  };

  const competitions = props.competitions.map((competition, index) => {
    return (
      <li className="competition" key={index}>
        <h3>{competition.exhibitionName}</h3>
        <p>Date: {competition.date}</p>
        <p>Location: {competition.location}</p>
        <p>Difficulty: {competition.difficulty}</p>
        <p>Prize Pool: {competition.prizePool}</p>
        <p>Capacity: {competition.capacity}</p>
        <img className="comp-img" src={competition.img} alt="Competition" />
        <button onClick={(event) => handleClick(event, competition)}>
          More Details
        </button>
      </li>
    );
  });

  return (
    <>
      <header>
        <h1>Dog Shows</h1>
      </header>
      <main className="three-column-grid">
        <></>
        <section>
          <img
            className="header-img"
            src="http://dslv9ilpbe7p1.cloudfront.net/r_6XMNykapocTTNUXW4sMA_store_banner_image.jpeg"
            alt=""
          />
          <h2 className="spacer">List of all upcoming dog competitions:</h2>
          <form className="">
            <select
              onChange={handleFilterByCompetitionLevel}
              name="filter-by-competition"
              id="filter-by-competition"
              className=""
            >
              <option value=""> Filter Competitions By Levels</option>
              <option value="Hard">HARD</option>
              <option value="Medium">MEDIUM</option>
              <option value="Easy">EASY</option>
              {/* {props.competitions.map((comp) => (
                <option value={comp.difficulty}>{comp.difficulty}</option>
              ))} */}
            </select>
          </form>
        </section>
        <section>
          <ul className="three-column-grid-comps">
            {props.competitions
              .filter((competition) => {
                if (
                  selectedCompetition === competition.difficulty ||
                  selectedCompetition === ""
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((competition, index) => {
                return (
                  <li key={index}>
                    <h3>{competition.exhibitionName}</h3>
                    <p>Date: {competition.date}</p>
                    <p>Location: {competition.location}</p>
                    <p>Difficulty: {competition.difficulty}</p>
                    <p>Prize Pool: {competition.prizePool}</p>
                    <p>Capacity: {competition.capacity}</p>
                    <img src={competition.img} alt="Competition" />
                    <button
                      onClick={(event) => handleClick(event, competition)}
                    >
                      More Details
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
        <div></div>
      </main>
    </>
  );
}

export default Home;
