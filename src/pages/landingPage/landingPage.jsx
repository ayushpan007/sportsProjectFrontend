import { Link } from 'react-router-dom';
import './landingPage.css'
const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <div className="button-container">
                    <Link to="/login">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="button">Sign Up</button>
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;
