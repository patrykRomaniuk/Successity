import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    
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
    }

    return (
        <main className="register-page-wrapper">
        <form className="register-section" onSubmit={(e) => onSubmit(e)}> 
            <div className="inputs-wrapper">

                <header className="register-header-wrapper">
                    <p className="font__p p__size register-header">
                        <i className="fas fa-users users-icon app_color_font"></i>
                       Zaloguj się
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
                    <label className="label__register p__size">Hasło</label>
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
                            Zarejestruj się
                        </p>
                    </Link>
                    <Link to="/register">
                        <p className="p__size font__p password__info" style={{ marginLeft: '10px' }}>
                            Zmień hasło
                        </p>
                    </Link>
                </div>

                <div className="button-wrapper app_color_background" onClick={(e) => onSubmit(e)}>
                    <p className="button-letter">Zaloguj się</p>
                </div>

            </div>
        </form>
    </main>
    )
}

export default Login
