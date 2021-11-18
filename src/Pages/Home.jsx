import { useNavigate } from "react-router-dom";
import './Css_pages/home.css';

function Home(props) {
  const navigate = useNavigate();
  function handleClick(event, competition) {
    event.preventDefault()
    navigate(`/competitions/${competition.id}`)
  }

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
        <div></div>
        <div>
          <section>
            <img className="header-img" src="http://dslv9ilpbe7p1.cloudfront.net/r_6XMNykapocTTNUXW4sMA_store_banner_image.jpeg" alt="" />
            <h2 className="spacer">List of all upcoming dog competitions:</h2>
            <p className="spacer">*FILTER COMPETITION BY DIFFICULTY HERE*</p>
          </section>
          <section>
            <ul className="three-column-grid-comps">{competitions}</ul>
          </section>
        </div>
        <div></div>
      </main>
    </>
  );
}

export default Home;
