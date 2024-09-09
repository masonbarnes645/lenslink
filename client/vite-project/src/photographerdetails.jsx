import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import NewBooking from "./newbookingmodal";

const PhotographerDetails = () => {
    const { photographerId } = useParams();
    const [photographer, setPhotographer] = useState(null)
    const { user } = useContext(UserContext)
    
    useEffect(() => {

          fetch(`http://localhost:5555/api/v1/photographers/${photographerId}`)
            .then((resp) => {
              if (resp.ok) {
                return resp.json().then((data) => {
                    console.log(data)
                    setPhotographer(data);
                });
              } else {
                return resp.json().then(() => {
                  resp.json().then((errorObj) => toast.error(errorObj.error));
                });
              }
            })
            .catch((errorObj) => toast.error(errorObj.error));
      }, [photographerId, user]);

    if (photographer)
      return(
        <div>
        <h1>{photographer.first_name}</h1>
        <NewBooking photographerId={photographerId} />

    
        </div>
    )
}

export default PhotographerDetails

// create booking details (for customers) /bookings post
// photographer by id route fetch call
