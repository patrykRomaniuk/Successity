import React,{ useEffect } from 'react';
import { getUserById,getUserPostsByUserId } from '../actions/users';
import UserPostsWrapper from './LoopHandler/UserPostsWrapper';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

const UserProfile = ({ getUserById,getUserPostsByUserId,match,user,post,userProfile }) => {
    useEffect(() => {
        getUserById(match.params.user_id);
        getUserPostsByUserId(match.params.user_id);
    }, [])
    return user === null || 
    user.userProfile === null || 
    user.profilePosts === []  || 
    post === user.profilePosts ? (
        <div className="all-page-wrapper flex__center">
            <Spinner/>
        </div>
    ) : (
        <div className="account-page-wrapper">

            <div className="data">
                <img src={ userProfile.avatar } alt=""/>

                <div className="data-items">

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Imię:</p>{ userProfile.name }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Nazwisko:</p> { userProfile.last_name }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Pseudonim:</p> { userProfile.username }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">E-mail:</p> { userProfile.email }
                    </div>

                </div>
                <div className="user-posts">
                <header className="user-posts-header-wrapper app_color_background">
                        {
                            post !== null || post !== []
                            ?
                            (
                                <p className="user-posts-header font__p font__bold">
                                    His posts
                                </p>
                            )
                            :
                            (
                                <p className="user-posts-header font__p font__bold">
                                    He hasn't added post
                                </p>
                            )
                        }
                    </header>
                    <UserPostsWrapper posts={user.profilePosts}/>
                </div>
            </div>

          
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    userProfile: state.user.userProfile,
    post: state.post.post
});

export default connect(mapStateToProps, {
    getUserById,
    getUserPostsByUserId
})(UserProfile);