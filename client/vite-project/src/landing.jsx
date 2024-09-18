import { Link } from "react-router-dom"
import './App.css'

const stock_url = "https://images.unsplash.com/photo-1719937206094-8de79c912f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const Landing = () => {
    return (
        <div className="landing-container">
            <img src={stock_url} alt="photographer with mother" id="landing-photo" />
            <div className="content-container">
                <div className="header">
                    <img src="/logo.png" alt="Website Logo" className="logo" />
                    <h1 className="website-name">LensLink</h1>
                </div>
                <p className="blurb">Connecting you with the best professional photographers for every occasion.</p>
                <div className="button-container">
                    <Link to="/signup">
                        <button className="right-button">Get Started</button>
                    </Link>
                    <Link to="/login">
                        <button className="left-button">Log in</button>
                    </Link>
                    <Link to="/photographers">
                        <button className="top-button">Browse Photographers</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;