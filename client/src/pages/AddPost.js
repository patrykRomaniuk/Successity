import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makePost,clearPost } from '../actions/posts';
import Moment from 'react-moment';

const AddPost = ({ makePost,clearPost,auth: { isAuthentictated },post }) => {
    const [ postText,setPostText ] = useState('');

    if(isAuthentictated === false){
        return <Redirect to="/login"/>
    }

    const onChange = e => {
        setPostText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        if(postText !== ''){
            makePost(postText);
        } else {
            alert('Wypełnij pole tekstowe');
        }

        setPostText('');

        setTimeout(() => {
            clearPost();
        }, 10000);
    }

    return (
        <div className="make-post-wrapper">

            
                {
                post.post === null 
                ?
                (
                <div className="tips-wrapper">
                    <p className="font__p p__size font__bold app_color_font">
                        <i className="fas fa-check-circle small_margin_right"></i>
                        Porady jak szybciej otrzymać odpowiedź
                    </p>
                    <br/>

                <ul className="tips">
                    <li className="tip-item">
                        <p className="font__p">
                            <i className="fas fa-check small_margin_right"></i>
                            Upewnij się, że pytanie nie było wcześniej zadane
                        </p>
                    </li>

                    <li className="tip-item">
                        <p className="font__p">
                            <i className="fas fa-check small_margin_right"></i>
                            Utrzymuj pytania krótkie i treściwe
                        </p>
                    </li>

                    <li className="tip-item">
                        <p className="font__p">
                            <i className="fas fa-check small_margin_right"></i>
                            Dwukrotnie sprawdź czy nie ma błędów
                        </p>
                    </li>
                    <li className="tip-item">
                        <p className="font__p">
                            <i className="fas fa-check small_margin_right"></i>
                            Zacznij swoje pytanie od "Co", "Dlaczego", "Jak", itp.
                        </p>
                    </li>
                    </ul>

                    <form onSubmit={e => onSubmit(e)}>
                        <textarea
                        type="text"
                        value={ postText }
                        onChange={e => onChange(e)}
                        />
                        <div 
                        className="app_color_background add-post-button font__p font__bold"
                        onClick={e => onSubmit(e)}>
                            Add post
                        </div>
                    </form>
                    
                    </div>
                )
                :
                (
                    <div className="output">
                        <div className="flex__center">
                            <img 
                            className="output-image" 
                            src={ post.post.avatar } 
                            alt=""/>
                        </div>

                        <div className="text-date flex__center">

                            <p className="text-date__username font__p font__bold">
                                Username:{' '} { post.post.name }
                            </p>
                            
                            <p className="text-date__date">
                                <Moment format="YYYY/MM/DD HH:mm"></Moment>
                            </p>
                        </div>

                        <div className="post__buttons-wrapper flex__center">
                            <p className="post font__p">Text: { post.post.text }</p>
                            <button className="new-post" onClick={() => clearPost()}>
                                Add New Post
                            </button>
                            <button className="view-comment">
                                View Comments
                            </button>
                        </div>
                    </div>
                )
            }
            </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps,{ makePost,clearPost })(AddPost);
