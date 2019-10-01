import React,{ useEffect,useState } from 'react';
import Moment from 'react-moment';
import PostPageWrapper from './LoopHandler/PostPageWrapper';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { 
    getPost,
    clearPost,
    addLikePostPage, 
    makeComment, 
    removeLikeFromPostPage 
} from '../actions/posts';

const PostPage = ({ post,auth,match,getPost,addLikePostPage,clearPost,makeComment,removeLikeFromPostPage }) => {
    useEffect(() => {
        clearPost();
        getPost(match.params.id);
    },[getPost]);

    const [postValue,setPostValue] = useState('');

    const onChange = (e) => {
        setPostValue(e.target.value)
    }

    return post.post === null || post.post === [] ? (
        <div className="flex__center all-page-wrapper">
            <Spinner />
        </div>
    ) : (
        <div className="main-post-wrapper">
            
            <div className="topic-wrapper">

                <div className="topic-date">
                    <Moment format="YYYY/MM/DD HH:mm">
                    { post.post.date }
                    </Moment>
                </div>

                <div className="topic-user">
                    <img src={ post.post.avatar } className="topic-avatar" alt=""/>
                    <p className="font__p p__size">{ post.post.name }</p>
                </div>
                
                <div className="topic-section">
                    <p>{ post.post.text }</p>
                    <div className="topic-section-links">
                        
                        <div className="like-item">    

                            <p 
                            className="font__p font__bold p__size hover"         
                            onClick={() => {
                                    if(post.post.likes.find(like => like.user === auth.user._id)){
                                        post.post.likes.find(like =>removeLikeFromPostPage(
                                            post.post._id,
                                            like._id
                                        ))
                                } else {
                                    addLikePostPage(
                                        post.post._id
                                    )
                                }
                            }}>
                                <i
                                className={
                                post.post.likes
                                .find(like => like.user === auth.user._id) ?
                                "fas fa-thumbs-up" 
                                :
                                "far fa-thumbs-up"
                            }>
                                </i>
                                { post.post.likes.length }
                            </p>
                          
                        </div>

                    </div>
                </div>

            </div>

             <div className="post-page-header">

                <form 
                className="search-topic-wrapper" 
                style={{ display: auth.isAuthenticated ? "flex" : "none" }}
                >
                    <p className="app_color_font font__bold font__p topics-headline"
                    style={{ textAlign: 'center' }}>
                        Create Post
                    </p>

                    <textarea 
                    value={ postValue }
                    onChange={(e) => onChange(e)}
                    type="text"
                    />

                    <div 
                    className="topic-search-button app_color_background font__p font__bold" 
                    onClick={() => {
                        makeComment(post.post._id,postValue)
                        setPostValue('');
                    }}>
                        Add comment
                    </div>
                </form>

            </div>               
        
            <div className="comments-align-left">
                <PostPageWrapper comments={post.post.comments}/>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});


export default connect(mapStateToProps, { 
    getPost,
    addLikePostPage,
    makeComment,
    clearPost,
    removeLikeFromPostPage
})(PostPage);
