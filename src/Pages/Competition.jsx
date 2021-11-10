import { useParams } from "react-router-dom"
import { useEffect } from "react"

function Competition({setCompetitions}) {
    const { id } = useParams();

    function getCompetition() {
        const url = `http://localhost:3030/competition/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((Data) => {
            console.log(Data)
            setCompetitions(Data.data)
          })
      }
    
      useEffect(() => {
        getCompetition()
      }, [])
  
    
    return(
        <>
        </>
    )
}

export default Competition