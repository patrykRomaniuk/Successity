import React from 'react';
import User from './User';

const UsersWrapper = ({ users }) => 
users !== null && 
users !== [] &&
users !== {} &&
users.length > 0 &&
users.map(user => <User user={user}/>)

export default UsersWrapper
