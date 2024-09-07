import { Link } from "react-router-dom"

const Landing = () => {

    return(
        <>
        <Link to="/signup">
            <button>Get Started</button>
        </Link>
        <Link to="/login">
            <button>Log in</button>
        </Link>
        <Link to="/photographers">
            <button>Browse Professional Photographers</button>
        </Link>
        </>
    )
}

export default Landing
