import React,{ useEffect } from 'react';
import { getUserPosts } from '../actions/users';
import '../styles/Account.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserPostsWrapper from './LoopHandler/UserPostsWrapper';

const Account = ({ getUserPosts,profilePosts,auth: { avatar,email,name,last_name,username,isAuthenticated } }) => {
   
    if(!isAuthenticated){
        return <Redirect to="/topics"/>
    }

    useEffect(() => {
        getUserPosts();
    },[]);

    return (
        <div className="account-page-wrapper">

            <div className="data">

                <img src={ avatar } alt=""/>

                <div className="data-items">
                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Imię:</p> { name }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Nazwisko:</p> { last_name }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">Pseudonim:</p> { username }
                    </div>

                    <div className="font__p data-item">
                        <p style={{ marginRight: '.4em' }} className="font__bold">E-mail:</p>{'  '}{ email }
                    </div>

                </div>

            </div>

            <div className="user-posts">
                <header className="user-posts-header-wrapper app_color_background">
                     {
                        profilePosts !== null || profilePosts !== []
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
                <UserPostsWrapper posts={profilePosts}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profilePosts: state.user.profilePosts
});

export default connect(mapStateToProps, { getUserPosts })(Account);
