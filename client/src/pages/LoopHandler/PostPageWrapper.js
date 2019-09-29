import React from 'react'
import PostPageItem from './PostPageItem'

const PostPageWrapper = ({ comments }) => 
comments !== null &&
comments.map(comment => <PostPageItem comment={comment} key={comment._id}/>)

export default PostPageWrapper
