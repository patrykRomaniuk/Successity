import React,{ useEffect,Fragment } from 'react';
import { getUserPosts } from '../actions/posts';
import '../styles/Account.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserPostsWrapper from './LoopHandler/UserPostsWrapper';

const Account = ({ getUserPosts,post,auth: { avatar,name,last_name,username,isAuthenticated } }) => {
    if(!isAuthenticated){
        return <Redirect to="/topics"/>
    }
    useEffect(() => {
        getUserPosts();
    },[])
    return (
        <div className="account-page-wrapper">

            <div className="data">
                <img src={ avatar } alt=""/>

                <div className="data-items">
                    <div className="font__p data-item">
                        <p className="font__bold">Imię:</p> 
                        { name }
                    </div>

                    <div className="font__p data-item">
                        <p className="font__bold">Nazwisko:</p> { last_name }
                    </div>
                    <div className="font__p data-item">
                        <p className="font__bold">Pseudonim:</p> { username }
                    </div>
                </div>

            </div>

            <div className="user-posts">
                <header className="user-posts-header-wrapper app_color_background">
                     {
                         post.post !== null || post.post !== []
                         ?
                        (
                            <p className="user-posts-header font__p font__bold">
                                Twoje tematy
                            </p>
                        )
                        :
                        (
                            <p className="user-posts-header font__p font__bold">
                                Nie zadałeś żadnych pytań
                            </p>
                        )
                     }
                </header>
                <UserPostsWrapper posts={post.post}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { getUserPosts })(Account);
