import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="main__nav">
            <div className="logo-wrapper">LOGO</div>
            <div className="nav-links">
                <Link to="/users" className="href__style__remove nav__link">Users</Link>
                <Link to="/topics" className="href__style__remove nav__link">Topics</Link>
                <Link to="/login" className="href__style__remove nav__link">Login</Link>
                <Link to="/register" className="href__style__remove nav__link">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Navbar
