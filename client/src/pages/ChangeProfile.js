import React,{ useState } from 'react';
import { changeEmail,changeUsername,changeName,changeLastName } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ChangeProfile = ({ auth,changeEmail,changeUsername,changeName,changeLastName }) => {

    if(!auth.isAuthenticated){
        return <Redirect to="/login"/>
    }

    const [ formData,setFormData ] = useState('');
    const [ inputValue,setInputValue ] = useState('');

    const onChange = divData => {
        setFormData(divData);
    }

    const resetFormData = () => {
        setFormData('');
    }

    const onSubmit = e => {
        e.preventDefault();
        if(formData === 'e-mail'){
            changeEmail(inputValue);
        } else if(formData === 'username'){
            changeUsername(inputValue);
        } else if(formData === 'last name'){
            changeLastName(inputValue);
        } else if(formData === 'name'){
            changeName(inputValue);
        }
    }


    return (
        <div className="change-profile-page-wrapper">

        {
            formData === ''
            ?
            (
                <form className="change-profile-section">

                    <div className="input-wrapper" onClick={() => onChange("username")}>
                        <p className="font__bold p__size font__p">Change Username</p>
                    </div>

                    <div className="input-wrapper" onClick={() => onChange("e-mail")}>
                        <p className="font__bold p__size font__p">Change Email</p>
                    </div>

                    <div className="input-wrapper" onClick={() => onChange("name")}>
                        <p className="font__bold p__size font__p">Change name</p>
                    </div>

                    <div className="input-wrapper" onClick={() => onChange("last name")}>
                        <p className="font__bold p__size font__p">Change last name</p>
                    </div>

                </form>
            )
            :
            (
                <form className="change-profile-section">
                        <p className="font__bold font__p p__size">Add new {formData}</p>
                        <input onChange={(e) => {
                            setInputValue(e.target.value);
                        }} 
                        type={ formData === 'email' ? `email` : `text`}
                        placeholder="Type something..."
                        className="change-profile-input"
                        />

                        <div className="change-profile-buttons-wrapper">

                            <div className="change-profile-btn" onClick={(e) => onSubmit(e)}>
                                Submit
                            </div>

                            <div className="change-profile-btn" onClick={() => resetFormData()}>
                                Go back                           
                            </div>

                        </div>

                </form>
            )
        }

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    changeEmail,
    changeUsername,
    changeName,
    changeLastName
})(ChangeProfile);
