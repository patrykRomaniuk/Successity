import React from 'react';
import TopicPost from './TopicPost';

const UserPostsWrapper = ({ posts }) => 
    posts !== null &&
    posts.length > 0 &&
    posts.map(post => <TopicPost post={post} key={post._id}/>)

export default UserPostsWrapper;
