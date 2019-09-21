import React from 'react';
import TopicPost from './TopicPost';

const UserPostsWrapper = ({ 
    posts,
    isOldest,
    isLatest,
    isMostCommented,
    isMostLikedPosts 
}) => 
    posts !== null &&
    posts.length > 0 &&
    posts.map(post => <TopicPost
        isOldest={ isOldest }
        isLatest={ isLatest }
        isMostCommented={ isMostCommented }
        isMostLikedPosts={ isMostLikedPosts }
         post={post} 
         key={post._id}
         />)

export default UserPostsWrapper;
