import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";

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

  return (
    <>
      <header>
        <h1>Dog Shows</h1>
      </header>
      <main>
        <section>
          <h2>List of all upcoming dog competitions:</h2>
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
          <ul>
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
      </main>
    </>
  );
}

export default Home;

