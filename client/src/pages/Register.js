import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { Redirect } from 'react-router-dom';

const Register = ({ registerUser,isAuthenticated,error }) => {

    useEffect(() => {
        error = {};
    }, [])

    if(isAuthenticated){
        return <Redirect to="/"/>
    }

    let [ showPassword,setShowPassword ] = useState(false);

    const [ formData,setFormData ] = useState({
        name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });

    const { name,last_name,username,email,password } = formData;

    const onChange = e => {
        setFormData({ ...formData,[e.target.name]: e.target.value })
    }

    const onSubmit = e => {
            e.preventDefault();
            registerUser(name,last_name,username,email,password);
            setFormData({ 
                ...formData,       
                name: '',
                last_name: '',
                username: '',
                email: '',
                password: '' 
            })
    }

    return (
        <main className="register-page-wrapper">
            <form className="register-section" onSubmit={(e) => onSubmit(e)}> 
                <div className="inputs-wrapper">

                    <header className="register-header-wrapper">
                        <p className="font__p p__size register-header">
                            <i className="fas fa-users users-icon app_color_font"></i>
                            Sign Up
                        </p>
                    </header>

                    <div className="label-wrapper">
                        <label className="label__register p__size">Name</label>
                    </div>

                    <input 
                    type="text"
                    name="name"
                    value={ name }
                    onChange={(e) => onChange(e)}
                    />

                    <div className="label-wrapper">
                        <label className="label__register p__size">Last Name</label>
                    </div>
                    <input 
                    type="text"
                    value={ last_name }
                    name="last_name"
                    onChange={(e) => onChange(e)}
                    />

                    <div className="label-wrapper">
                        <label className="label__register p__size">Username</label>
                    </div>
                    <input
                    type="text"
                    name="username"
                    value={ username }
                    onChange={(e) => onChange(e)}
                    />

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
                    type={ showPassword ? "text" : "password" }
                    value={password}
                    onChange={(e) => onChange(e)}
                    />

                    <i onClick={() => setShowPassword(!showPassword)} className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash" }>
                    </i>

                    <div className="label-wrapper">
                        <p className="p__size font__p password__info">
                            <i className="fas fa-user-check app_color_font"></i>{' '}
                            Password must have at least 6 letters
                        </p>
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
                                Something went wrong...
                            </p>
                        </div>
                    )
                }

                    <div className="button-wrapper app_color_background" onClick={(e) => onSubmit(e)}>
                        <p className="button-letter">Sign Up</p>
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

export default connect(mapStateToProps, { registerUser })(Register);
