import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
    addLike,
    removeLikeFromTopicPage
} from '../../actions/posts';

const TopicPost = ({ post,auth,removeLikeFromTopicPage,addLike,isOldest,isLatest,isMostLikedPosts,isMostCommented }) => {
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
                    
                <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>                  
                        <div 
                        className="font__p font__bold p__size like-item"         
                        onClick={() => {
                            if(post.likes.find(like => like.user === auth.user._id)){
                                post.likes
                                .find(like => 
                                    removeLikeFromTopicPage(
                                        post._id,
                                        like._id,
                                        isOldest,
                                        isLatest,
                                        isMostCommented,
                                        isMostLikedPosts
                                    ));
                            } else {
                                addLike(
                                    post._id,
                                    isOldest,
                                    isLatest,
                                    isMostCommented,
                                    isMostLikedPosts
                                );
                            }
                        }}
                        >
                            <i 
                            className={
                                post.likes
                                .find(like => like.user === auth.user._id) ?
                                "fas fa-thumbs-up" 
                                :
                                "far fa-thumbs-up"
                            }
                            >   
                            </i>
                        </div>

                        <div className="font__p font__bold p__size likes-length-item">
                            { post.likes.length }
                        </div>

                    </div>

                    <div className="topic-comment-section font__p font__bold p__size">
                            <i className="far fa-comment"></i>
                            <p>{ post.comments.length }</p>
                    </div>

                    <div className="link-to-post-page-button app_color_background font__p font__bold p__size">
                        <Link to={`/topics/topic/${post._id}`}>
                            View More
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike,removeLikeFromTopicPage })(TopicPost);
