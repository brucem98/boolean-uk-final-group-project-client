import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Competition() {
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
  
    
    return(
        <>
        </>
    )
}

export default Competition