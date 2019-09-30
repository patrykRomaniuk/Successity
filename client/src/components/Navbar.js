import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/auth';
import { connect } from 'react-redux';
import chatGlassIcon from '../chatGlassIcon.png';

const Navbar = ({ logOut,auth: { isAuthenticated } }) => {
    
    const [ isSidebar,setSidebar ] = useState(false);
    
    return (
        <nav className="main__nav">

            <div className="logo-wrapper">
                <Link to="/">
                    <img src={ chatGlassIcon } alt=""/>
                </Link>
            </div>

            <div className="nav-links">

                <Link to="/users" className="href__style__remove nav__link">
                    Użytkownicy <i className="fas fa-users"></i>
                </Link>

                <Link to="/topics" className="href__style__remove nav__link">
                    Tematy   <i className="fas fa-comments"></i>
                </Link>

                <Link 
                to="/login" 
                className="href__style__remove nav__link"
                 style={{ display: isAuthenticated ? 'none' : 'flex' }}>
                     Zaloguj się
                </Link>

                <Link 
                to="/register" 
                className="href__style__remove nav__link"
                style={{ display: isAuthenticated ? 'none' : 'flex' }}>
                    Załóż konto
                </Link>

                <Link to="/account" className="href__style__remove nav__link"
                 style={{ display: isAuthenticated ? 'flex' : 'none' }}>
                    Profil <i className="fas fa-user"></i>
                </Link>

                <Link to="/add-post" className="href__style__remove nav__link"
                 style={{ display: isAuthenticated ? 'flex' : 'none' }}>
                    Zadaj pytanie <i className="fas fa-edit"></i>
                </Link>

                <Link to="/login" className="href__style__remove nav__link"
                onClick={() => logOut()}
                style={{ display: isAuthenticated ? 'flex' : 'none' }}>
                    Wyloguj się <i className="fas fa-sign-out-alt"></i>
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
                transition: 'width .4s ease-in-out',
                width: isSidebar ? '103vw' : '0vw',
                zIndex: isSidebar ? '3' : '2'
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
                     >Użytkownicy
                     </Link>

                    <Link 
                    className="sidebar-link"
                     to="/topics"
                     onClick={() => setSidebar(false)}>
                         Tematy
                    </Link>

                    <Link
                     className="sidebar-link" 
                     to="/add-post"
                     onClick={() => setSidebar(false)}
                     >Zadaj pytanie
                     </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/account"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'flex' : 'none' }}
                    >
                        Profil
                    </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/login"
                    onClick={() => {
                        logOut();
                        setSidebar(false)
                    }}
                    style={{ display: isAuthenticated ? 'flex' : 'none' }}
                    >
                        Wyloguj się
                    </Link>

                    <Link 
                    className="sidebar-link" 
                    to="/login"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'none' : 'flex' }}
                    >
                        Zaloguj się
                    </Link>
                    
                    <Link 
                    className="sidebar-link" 
                    to="/register"
                    onClick={() => setSidebar(false)}
                    style={{ display: isAuthenticated ? 'none' : 'flex' }}
                    >Załóż konto
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
