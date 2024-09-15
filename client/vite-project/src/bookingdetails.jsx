import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import toast from "react-hot-toast";


const BookingDetails = () =>{
    const { user } = useContext(UserContext)
    const [booking, setBooking] = useState()
    const { bookingId } = useParams();

    useEffect(() => {
        fetch(`/api/v1/bookings/${bookingId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json().then((data) => {
                console.log(data)
                setBooking(data);
              });
            } else {
              return resp.json().then(() => {
                resp.json().then((errorObj) => toast.error(errorObj.error));
              });
            }
          })
          .catch((errorObj) => toast.error(errorObj.error));
      }, [bookingId, user]);
    
    if (booking)
      return(
        <h1>{booking.location}</h1>
    )
}

export default BookingDetails