import React,{ useState } from 'react';
import { changePassword,checkPassword } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ChangePassword = ({ auth,changePassword,checkPassword }) => {

    if(!auth.isAuthenticated){
        return <Redirect to="/login"/>
    }

    const [ outputSection,setOutputSection ] = useState(false);

    let [ formData,setFormData ] = useState({
        password1: '',
        password2: '',
        newPassword: ''
    });

    const { password1,password2,newPassword } = formData;

    const onChange = e => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(password1 !== password2){
            alert(`Passwords don't match`);
        } else if(password1 === '' || password1 === null || password2 === '' || password2 === null){
            alert('Please fulfill inputs');
        } else {
            checkPassword(password1);
        }
    }

    return (
        <div className="change-profile-page-wrapper">
            {
                auth.isAllowedToChangePassword === false && 
                (
                    <form className="change-profile-section">

                        <div className="change-password-input-wrapper">

                            <label className="change-password-label p__size font__p font__bold">
                                Type actual password
                            </label>
                            <input 
                            className="change-password-input"
                            placeholder="Type Something..." 
                            type="text" 
                            value={ password1 } 
                            name="password1" 
                            onChange={e => onChange(e)}
                            />

                        </div>

                        <div className="change-password-input-wrapper">

                            <label className="change-password-label p__size font__p font__bold">
                                Type again password
                            </label>
                            <input
                            className="change-password-input" 
                            placeholder="Type Something..."
                            type="text" 
                            value={ password2 } 
                            name="password2" 
                            onChange={e => onChange(e)}
                            />

                        </div>
                        
                        <div className="password-page-button" onClick={(e) => onSubmit(e)}>
                            Submit                          
                        </div>
                    </form>
                ) 
                }

                {
                auth.isAllowedToChangePassword === true && outputSection === false 
                &&
                (
                    <form className="change-profile-section">

                        <div className="change-password-input-wrapper">

                            <label className="change-password-label p__size font__p font__bold">
                                Type New Password
                            </label>

                            <input 
                            placeholder="Type New Password..."
                            value={ newPassword } 
                            name="newPassword" 
                            onChange={e => onChange(e)}
                            type="text"
                            />

                            <div 
                            className="password-page-button" 
                            style={{
                                marginTop: '.5em'
                            }} 
                            onClick={() => {
                                changePassword(newPassword);
                                setOutputSection(true);
                            }}
                            >
                                Submit
                            </div>
                        </div>

                    </form>
                )
            }

            {
                auth.isAllowedToChangePassword === true && outputSection === true 
                &&
                (
                    <section className="change-profile-section">

                        <div className="change-password-input-wrapper flex__center">
                            <span className="font__bold font__p p__size">Password has changed</span>
                        </div>

                    </section>
                 )
            }

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { changePassword,checkPassword })(ChangePassword);
