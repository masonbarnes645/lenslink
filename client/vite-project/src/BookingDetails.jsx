import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import toast from "react-hot-toast";

const BookingDetails = () => {
    const { user } = useContext(UserContext);
    const [booking, setBooking] = useState();
    const [photographer, setPhotographer] = useState();
    const { bookingId } = useParams();

    useEffect(() => {
        fetch(`/api/v1/bookings/${bookingId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json().then((data) => {
                console.log(data);
                setBooking(data);
              });
            } else {
              return resp.json().then((errorObj) => toast.error(errorObj.error));
            }
          })
          .catch((errorObj) => toast.error(errorObj.error));
    }, [bookingId, user]);

    useEffect(() => {
        if (booking && booking.photographer_id) {
            fetch(`/api/v1/photographers/${booking.photographer_id}`)
              .then((resp) => {
                if (resp.ok) {
                  return resp.json().then((data) => {
                    console.log(data);
                    setPhotographer(data);
                  });
                } else {
                  return resp.json().then((errorObj) => toast.error(errorObj.error));
                }
              })
              .catch((errorObj) => toast.error(errorObj.error));
        }
    }, [booking]);

    if (!booking) return <p>Loading booking details...</p>;
    if (!photographer) return <p>Loading photographer details...</p>;

    return (
        <div>
            <h1>Location: {booking.location}</h1>
            <h2>Date: {booking.booking_date} Time: {booking.booking_time}</h2>
            <h2>Length of Session: {booking.session_length} hours</h2>
            {photographer && (
                <h4>Contact your photographer, {photographer.first_name} {photographer.last_name} at {photographer.email}</h4>
            )}
        </div>
    );
};

export default BookingDetails;