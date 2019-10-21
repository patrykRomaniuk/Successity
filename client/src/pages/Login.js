import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import { Link } from 'react-router-dom';

const Login = ({ loginUser,isAuthenticated,error }) => {
    
    if(isAuthenticated){
        return <Redirect to="/"/>
    }

    const [ formData,setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email,password } = formData;

    const onChange = e => {
        setFormData({ ...formData,[e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        loginUser(email,password);
    }

    return (
        <main className="register-page-wrapper">
        <form className="register-section" onSubmit={(e) => onSubmit(e)}> 
            <div className="inputs-wrapper">

                <header className="register-header-wrapper">
                    <p className="font__p p__size register-header">
                        <i className="fas fa-users users-icon app_color_font"></i>
                      Log in
                    </p>
                </header>

                <div className="label-wrapper">
                    <label className="label__register p__size">E-mail</label>
                </div>
                <input 
                name="email"
                value={ email }
                type="email"
                onChange={(e) => onChange(e)}
                />

                <div className="label-wrapper">
                    <label className="label__register p__size">Password</label>
                </div>
                <input 
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
                />

                <div className="label-wrapper">
                    <Link to="/register">
                        <p className="p__size font__p password__info">
                            Sign up
                        </p>
                    </Link>
                </div>

                {
                    (error && (error !== null || error !== '' || error !== {})) 
                    &&
                    (
                        <div>
                            <p 
                            className="font__bold font__p p__size"
                            style={{
                                color: '#fb2f2f',
                                textAlign: 'center'
                            }}
                            >
                                Wrong e-mail or password
                            </p>
                        </div>
                    )
                }

                <div className="button-wrapper app_color_background" onClick={(e) => onSubmit(e)}>
                    <p className="button-letter">Log in</p>
                </div>

            </div>
        </form>
    </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { loginUser })(Login);
