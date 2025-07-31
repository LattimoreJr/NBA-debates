import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, isAdmin, darkMode, setDarkMode }) => {
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 1rem'
            }}
        >
            <div className="nav-links">
                <Link to="/">Home</Link>
                {isLoggedIn && <Link to="/userHome">About</Link>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {!isLoggedIn && <Link to="/register">Register</Link>}
                {isLoggedIn && Boolean(isAdmin) && <Link to="/admin">Admin</Link>}
            </div>
            <div className="dark-mode-toggle">
                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;