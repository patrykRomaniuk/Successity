import React from 'react';
import { Link } from 'react-router-dom';
import { removePost } from '../../actions/posts';
import Spinner from '../../Spinner';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const UserPost = ({ post,auth,removePost }) => {
    return post === [] || post === null ? (
        <div className="all-page-wrapper flex__center">
            <Spinner/>
        </div>
    ) : (
        <div className="user-post" key={ post._id }>

            <div className="user-post-date">
                <Moment format="YYYY/MM/DD HH:mm">
                 { post.date }
                </Moment>
            </div>

            <div className="user-post-topic">
                <p className="font__p font__bold">{ post.text }</p>
            </div>

            <div className="post__likes__comments__deleteBtn-wrapper">
                <div className="post__likes__comments__deleteBtn">
                    <div className="user-post-likes">
                        <i className="far fa-thumbs-up"></i>{ post.likes.length }
                    </div>
                    <div className="user-post-comments">
                        <i className="far fa-comment"></i>{ post.comments.length }
                    </div>

                    <div style={{
                        display: post.user === auth.user._id
                        ? "block" : "none"
                    }}>
                        <div className="removePostBtn app_color_background" onClick={() => removePost(post._id)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    <div 
                    className="link-to-post-page-button app_color_background font__p font__bold p__size">
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

export default connect(mapStateToProps, { removePost })(UserPost);



