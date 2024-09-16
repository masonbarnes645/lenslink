

const Bslate = ({ booking_date, booking_time, location, photographer }) => {

    return (
        <div>
            <NavLink
                to={`/bookings/${id}`}
                style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                    textDecoration: 'none'
                })}
            > See details about this booking</NavLink>
            <h3>{location}</h3>
            <h4>{booking_date} : {booking_time}</h4>
            <h4>{photographer}</h4>
        </div>
    )
}

export default Bslate