import React from 'react'

const Navbar = () => {
    return (
        <nav className="main__nav">
            <div className="logo-wrapper">LOGO</div>
            <div className="nav-links">
                <a href="#" className="href__style__remove nav__link">Users</a>
                <a href="#" className="href__style__remove nav__link">Topics</a>
                <a href="#" className="href__style__remove nav__link">Login</a>
                <a href="#" className="href__style__remove nav__link">Sign Up</a>
            </div>
        </nav>
    )
}

export default Navbar
