import React,{ useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { getUsers,searchUsers } from '../actions/users';
import UsersWrapper from './LoopHandler/UsersWrapper';

const Users = ({ getUsers,searchUsers,auth }) => {

    useEffect(() => {
        getUsers();
    },[])

    const [ searchValue,setSearchValue ] = useState('');

    const onChange = e => {
        setSearchValue(e.target.value);
    }

    const checkSearch = searchValue => {
        if(searchValue !== '' && searchValue !== null){
            searchUsers(searchValue);
        } else {
            getUsers();
        }
    }

    return (
        <div>
            <header className="users-header">
                <p className="app_color_font font__bold font__p users-headline">
                    Users
                </p>
                <br/>

                <form onSubmit={() => {
                    checkSearch(searchValue)
                }} className="search-user-wrapper">

                 <textarea 
                 value={ searchValue }
                 onChange={(e) => onChange(e)}
                 type="text"
                 />

                 <div className="user-search-button app_color_background font__p font__bold" onClick={() => {
                    checkSearch(searchValue)
                }}>
                     Search for user
                 </div>

                </form>
            </header>

            <div className="users-wrapper">
                <UsersWrapper users={auth.users}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getUsers,searchUsers })(Users);
