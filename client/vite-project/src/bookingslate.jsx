

const Bslate = ({ booking_date, booking_time, location, photographer }) =>{

    return(
        <div>
            <h3>{location}</h3>
            <h4>{booking_date} : {booking_time}</h4>
            <h4>{photographer}</h4>
        </div>
    )
}

export default Bslate