import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/auth';

const Users = ({ getUsers }) => {
    useEffect(() => {
        getUsers();
    },[])
    return (
        <div>
            <div className="users-page-header">
                Users Page
            </div>
        </div>
    )
}

export default connect(null, { getUsers })(Users);
