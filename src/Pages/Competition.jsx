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
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setCompetition(data.data)
          })
      }
    
      useEffect(() => {
        getCompetition()
      }, [])
      console.log("competition", competition)
      
      
      const filteredDogs = dogs.filter(dog => dog.dogId === parseInt(id)).map(filteredDog => {
        console.log("filteredDog", filteredDog)  
        return (
        <li>
          <p>{filteredDog.name}</p>
        </li>
      )
    })
    
    return (
      <>
      <ul>
        {filteredDogs}
      </ul>
      </>
    )
  
      
        
    
}

export default Competition