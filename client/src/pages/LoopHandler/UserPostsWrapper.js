import React from 'react';
import UserPost from './UserPost';

const UserPostsWrapper = ({ posts }) => 
    posts !== null &&
    posts.length > 0 &&
    posts.map(post => <UserPost post={post} key={post._id}/>)

export default UserPostsWrapper;
