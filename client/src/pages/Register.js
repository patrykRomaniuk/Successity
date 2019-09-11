import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { Redirect } from 'react-router-dom';

const Register = ({ registerUser,isAuthenticated }) => {

    if(isAuthenticated){
        return <Redirect to="/"/>
    }

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
                            Zarejestruj się
                        </p>
                    </header>

                    <div className="label-wrapper">
                        <label className="label__register p__size">Imię</label>
                    </div>

                    <input 
                    type="text"
                    name="name"
                    value={ name }
                    onChange={(e) => onChange(e)}
                    />

                    <div className="label-wrapper">
                        <label className="label__register p__size">Nazwisko</label>
                    </div>
                    <input 
                    type="text"
                    value={ last_name }
                    name="last_name"
                    onChange={(e) => onChange(e)}
                    />

                    <div className="label-wrapper">
                        <label className="label__register p__size">Pseudonim</label>
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
                        <label className="label__register p__size">Hasło</label>
                    </div>
                    <input 
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    />

                    <div className="label-wrapper">
                        <p className="p__size font__p password__info">
                            <i className="fas fa-user-check app_color_font"></i>{' '}
                             Hasło musi mieć co najmniej 6 liter
                        </p>
                    </div>

                    <div className="button-wrapper app_color_background" onClick={(e) => onSubmit(e)}>
                        <p className="button-letter">Zarejestruj się</p>
                    </div>

                </div>
            </form>
        </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { registerUser })(Register);
