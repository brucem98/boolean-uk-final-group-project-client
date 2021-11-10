import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Competition() {
    const { id } = useParams();
    const [competition, setCompetition] = useState({})

    function getCompetition() {
        const url = `http://localhost:3030/competition/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((Data) => {
            console.log(Data)
            setCompetition(Data.data)
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