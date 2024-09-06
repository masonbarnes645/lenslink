import { Link } from "react-router-dom"

const Landing = () => {

    return(
        <>
        <Link to="/signup">
            <button>Get Started</button>
        </Link>
        <button>Log In</button>
        <Link to="/photographers">
            <button>Browse Professional Photographers</button>
        </Link>
        </>
    )
}

export default Landing
