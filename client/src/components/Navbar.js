import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/auth';
import { connect } from 'react-redux';

const Navbar = ({ logOut,auth: { isAuthenticated } }) => {
    
    const [ isSidebar,setSidebar ] = useState(false);
    /* style={{
                    display: isSidebar ? 'block' : 'none',
                    zIndex: isSidebar ? '2' : '-1'
                }}*/
    return (
        <nav className="main__nav">

            <div className="logo-wrapper">LOGO</div>

            <div className="nav-links">

                <Link to="/users" className="href__style__remove nav__link">Users</Link>

                <Link to="/topics" className="href__style__remove nav__link">Topics</Link>

                <Link 
                to="/login" 
                className="href__style__remove nav__link"
                 style={{ display: isAuthenticated ? 'none' : 'block' }}>
                     Login
                </Link>

                <Link 
                to="/register" 
                className="href__style__remove nav__link"
                style={{ display: isAuthenticated ? 'none' : 'block' }}>
                    Sign Up
                </Link>

                <Link to="/account" className="href__style__remove nav__link"
                 style={{ display: isAuthenticated ? 'block' : 'none' }}>
                    Account <i className="fas fa-user"></i>
                </Link>

                <Link to="/login" className="href__style__remove nav__link"
                onClick={() => logOut()}
                style={{ display: isAuthenticated ? 'block' : 'none' }}>
                    Log Out <i className="fas fa-sign-out-alt"></i>
                </Link>
                
                <div className="hamburger-wrapper">
                    <i 
                    className="fas fa-bars hamburger-bar"
                    onClick={() => setSidebar(true)}
                    ></i>
                </div>
            </div>

            <div 
            className="sidebar-wrapper"
            style={{
                display: isSidebar ? 'block' : 'none',
                transition: 'width 1.5s ease-in-out',
                width: isSidebar ? '100vw' : '0vw',
                zIndex: isSidebar ? '2' : '-1'
            }}
            >
                <div className="close-sidebar-wrapper">
                    <i 
                    onClick={() => setSidebar(false)} 
                    className="fas fa-times close-sidebar-icon"
                    ></i>
                </div>
                <div className="sidebar-links">

                    <Link
                     className="sidebar-link" 
                     to="/users"
                     onClick={() => setSidebar(false)}
                     >Users
                     </Link>

                    <Link 
                    className="sidebar-link"
                     to="/topics"
                     onClick={() => setSidebar(false)}>
                         Topics
                    </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/account"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'block' : 'none' }}
                    >
                        Account
                    </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/login"
                    onClick={() => {
                        logOut();
                        setSidebar(false)
                    }}
                    style={{ display: isAuthenticated ? 'block' : 'none' }}
                    >
                        Log Out
                    </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/login"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'none' : 'block' }}
                    >
                        Login
                    </Link>
                    
                    <Link 
                    className="sidebar-link" 
                    to="/register"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'none' : 'block' }}
                    >Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logOut })(Navbar);
