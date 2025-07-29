import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            // Optionally decode the token to check if user is admin
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.isAdmin) {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error("Invalid token", err);
            }
        }
    }, []);

    return (
        <nav>
            <Link to="/">Home</Link> | 
            {!isLoggedIn && <Link to="/login">Login</Link>} 
            {isLoggedIn && <>
            <Link to="/userHome">About Me</Link> 
            {isAdmin && <> | <Link to="/admin">Admin</Link></>}
            </>}
        </nav>
    );
}

export default Navbar