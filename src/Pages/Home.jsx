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
  return (
    <>
      <header>
        <h1>Dog Shows</h1>
      </header>
      <main className="three-column-grid">
        <div></div>
        <div>
          <section>
            <img
              className="header-img"
              src="https://previews.123rf.com/images/eriklam/eriklam1204/eriklam120400001/13060551-gruppe-von-zw%C3%B6lf-hunde-sitzen-vor-einem-wei%C3%9Fen-hintergrund.jpg"
              alt="dog-home"
            />
            <h2 className="spacer spacer-text">
              List Of All Upcoming Dog Competitions
            </h2>
            <form className="">
              <select
                onChange={handleFilterByCompetitionLevel}
                name="filter-by-competition"
                id="filter-by-competition"
                className="select-filter-home"
              >
                <option className="home-pg-select" value="">
                  Filter Competitions By Levels
                </option>
                <option className="home-pg-select" value="Hard">
                  HARD
                </option>
                <option className="home-pg-select" value="Medium">
                  MEDIUM
                </option>
                <option className="home-pg-select" value="Easy">
                  EASY
                </option>
                {/* {props.competitions.map((comp) => (
                <option value={comp.difficulty}>{comp.difficulty}</option>
              ))} */}
              </select>
            </form>
          </section>
          <section>
            <ul className="three-column-grid-comps">
              {props.competitions && props.competitions
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
                    <li className="competition" key={index}>
                      <h3>{competition.exhibitionName}</h3>
                      <p>Date: {competition.date}</p>
                      <p>Location: {competition.location}</p>
                      <p>Difficulty: {competition.difficulty}</p>
                      <p>Prize Pool: {competition.prizePool}</p>
                      <p>Capacity: {competition.capacity}</p>
                      <img src={competition.img} alt="Competition" />
                      <button
                        onClick={(event) => handleClick(event, competition)}
                        className="home-btn"
                      >
                        More Details
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>
        </div>
        <div></div>
      </main>
      <footer></footer>
    </>
  );
}

export default Home;
