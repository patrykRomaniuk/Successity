import React,{ useState } from 'react';
import { changePassword,checkPassword } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ChangePassword = ({ auth,changePassword,checkPassword }) => {

    if(!auth.isAuthenticated){
        return <Redirect to="/login"/>
    }

    const [ outputSection,setOutputSection ] = useState(false);
    const [ isNotFullFilled,setIsNotFullFilled ] = useState(false);
    const [ arePasswordsWrong,setArePasswordsWrong ] = useState(false);


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
            setArePasswordsWrong(true);
            setIsNotFullFilled(false);
        } else if(password1 === '' || password1 === null || password2 === '' || password2 === null){
            setArePasswordsWrong(false);
            setIsNotFullFilled(true);
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
                        
                        {
           
                            (auth.error && (auth.error !== null || auth.error !== '' || auth.error !== {})) 
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
                                        Wrong Password
                                    </p>
                                </div>
                            ) 
                        }

                        {
                            isNotFullFilled
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
                                         Fullfill inputs
                                     </p>
                                 </div>
                             ) 
                        }

                        {
                            arePasswordsWrong
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
                                         Passwords are not equal
                                     </p>
                                 </div>
                             ) 
                        }


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
                                if(auth.error === "REJECTED"){
                                    setOutputSection(false);
                                } else {
                                    setOutputSection(true);
                                }
                            }}
                            >
                                Submit
                            </div>
                        </div>

                    </form>
                )
            }

{
                 auth.isAllowedToChangePassword === true 
                 && 
                 outputSection === true
                 && 
                 (
                    auth.error !== null
                    ||
                    auth.error
                 )
                 &&
                 (
                    <section className="change-profile-section">

                    <div className="change-password-input-wrapper flex__center">
                        <span className="font__bold font__p p__size">You can't change on this password</span>
                    </div>

                </section>
                 )
            }

            {
                auth.isAllowedToChangePassword === true 
                && 
                outputSection === true  
                && 
                (
                    !auth.error
                    ||
                    auth.error === null
                    ||
                    auth.error === {}
                    ||
                    auth.error === ''
                )
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
