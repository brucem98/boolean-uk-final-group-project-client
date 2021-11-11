import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Competition(props) {
    const dogs = props.dogs

    console.log("props inside competition: ", props)
    
    console.log("dogs in competition: ", dogs)

    const { id } = useParams();
    const [competition, setCompetition] = useState({})
  
    
    function getCompetition() {
        const url = `${process.env.REACT_APP_FETCH_URL}/competition/${id}`;
        console.log("url: ", url)
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log("data: ", data)
            setCompetition(data.data)
          })
      }
    
      useEffect(() => {
        console.log("id: ", id)
        getCompetition()
      }, [])
      console.log("competition", competition)
      
      
      const filteredDogs = dogs.filter(dog => dog.competitions.filter(comp => comp.competitionId === parseInt(id)).length > 0)
      console.log("filtered dogs now: ", filteredDogs);
      const mappedDogs = filteredDogs.map(filteredDog => {
        
        return (
        <li>
        <h3>{filteredDog.name}</h3>
        <p>{filteredDog.breed}</p>
        <p>{filteredDog.age}</p>
        <p>{filteredDog.shotStatus}</p>
        <img src = {filteredDog.img} alt = "dogs" />
        </li>
      )
     
    })
 

    

    return (
      <>
      <ul>
        {mappedDogs}
      </ul>
      </>
    )
  
      
        
    
}

export default Competition