import { useState } from "react";

function SingleDog(props) {
    const {displayCompetitions, dog} = props
    const {id} = dog

    const handleDogDelete = () => {

        const fetchDogToDelete = {
            method: "DELETE",
        };
        const delUrl =`${process.env.REACT_APP_FETCH_URL}/dogs/${id}`
        
        console.log("Inside dog delUrl: ", delUrl)

        fetch(delUrl, fetchDogToDelete)
         .then((res) => res.json())
    };
        
    return(
        <>
         <li>
        <h3 className="reg-text">Dog details:</h3>
        <h3 className="reg-text">Name: {dog.name}</h3>
        <p className="reg-text">Breed: {dog.breed}</p>
        <p className="reg-text">Age: {dog.petAge}</p>
        <p className="reg-text">
          Shot: {dog.shotStatus ? dog.shotStatus.toString() : null}
        </p>
        <h3 className="reg-text">Participant details:</h3>
        <p className="reg-text">
          First Name: {dog.participant ? dog.participant.firstName : null}
        </p>
        <p className="reg-text">
          Last Name: {dog.participant ? dog.participant.lastName : null}
        </p>
        <h3>Event: {displayCompetitions}</h3>
        <img className="reg-img" src={dog.img} alt="dogs" />
        <button onClick={handleDogDelete}>Remove Dog</button>
      </li>

      </>
    )
}

export default SingleDog;