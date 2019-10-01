import React from 'react';
import Moment from 'react-moment';
import { 
    likeComment,
    removeLikeFromComment
} from '../../actions/posts';
import { connect } from 'react-redux';
import Spinner from '../../Spinner';


const PostPageItem = ({ comment,post,auth,likeComment,removeLikeFromComment }) => {
    return post === null || post === [] ? (
        <div className="flex__center all-page-wrapper">
            <Spinner />
        </div>
    ) : (
        <div className="topic-wrapper" key={comment._id}>

            <div className="topic-date">
                <Moment format="YYYY/MM/DD HH:mm">
                { comment.date }
                </Moment>
            </div>

            <div className="topic-user">
                <img src={ comment.avatar } className="topic-avatar" alt=""/>
                <p className="font__p p__size">{ comment.name }</p>
            </div>
            
            <div className="topic-section">
                <p>{ comment.text }</p>
                <div className="topic-section-links">
                    <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>                  
                    <div 
                        className="font__p font__bold p__size like-item"         
                        onClick={() => {
                            if(comment.likes.find(comment => comment.user === auth.user._id) ){
                                comment.likes
                                .find(like => {
                                    console.log(like)
                                    console.log(comment)
                                    removeLikeFromComment(
                                        post._id,
                                        comment._id,
                                        like._id                    
                                    )
                                });
                            } else {
                                likeComment(
                                    post._id,
                                    comment._id
                                );
                            }
                        }}
                        >
                            <i 
                            className={
                                comment.likes
                                .find(comment => comment.user === auth.user._id) 
                                ?
                                "fas fa-thumbs-up" 
                                :
                                "far fa-thumbs-up"
                            }
                            >   
                            </i>

                        </div>

                        <div className="font__p font__bold p__size likes-length-item">
                            <p>{ comment.likes.length }</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post.post
})

export default connect(mapStateToProps, { 
    likeComment,
    removeLikeFromComment
})(PostPageItem);
