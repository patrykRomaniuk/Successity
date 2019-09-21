import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
    addLike,
    getPosts,
    getLatestPosts,
    getMostLikedPosts,
    searchTopics,
    getMostCommented,
    getPost
} from '../../actions/posts';

const TopicPost = ({ post,addLike,isOldest,isLatest,isMostLikedPosts,isMostCommented }) => {
    return (
        <div className="topic-wrapper">

            <div className="topic-date">
                <Moment format="YYYY/MM/DD HH:mm">
                 { post.date }
                </Moment>
            </div>

            <div className="topic-user">
                <img src={ post.avatar } className="topic-avatar" alt=""/>
                <p className="font__p p__size">{ post.name }</p>
            </div>
            
            <div className="topic-section">
                <p>{ post.text }</p>
                <div className="topic-section-links">
                    
                    <div>                  
                        <p 
                        className="font__p font__bold p__size"         
                        onClick={() => {
                            addLike(post._id,isOldest,isLatest,isMostCommented,isMostLikedPosts);
                        }}
                        >
                            <i className="far fa-thumbs-up"></i>
                            { post.likes.length }
                        </p>
                        <p>
                        <i className="far fa-thumbs-down"></i>
                        </p>
                    </div>

                    <div>
                         <p>
                            <i className="far fa-comment"></i>
                            { post.comments.length }
                        </p>
                    </div>

                    <div>
                        <Link to={`/topics/topic/${post._id}`}>
                            View More
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default connect(null, { addLike })(TopicPost);
