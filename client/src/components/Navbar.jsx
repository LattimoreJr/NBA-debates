import { Link } from "react-router-dom";


const Navbar = ({ isLoggedIn, isAdmin }) => {
    

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/userHome">About</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/register">Register</Link>}
            {isLoggedIn && Boolean(isAdmin) && <Link to="/admin">Admin</Link>}
        </nav>
    );
}

export default Navbar