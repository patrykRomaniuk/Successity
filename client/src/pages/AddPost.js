import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { Redirect,Link } from 'react-router-dom';
import { makePost,clearPost } from '../actions/posts';

const AddPost = ({ makePost,clearPost,auth: { isAuthenticated },post }) => {

    if(!isAuthenticated){
        return <Redirect to="/login"/>
    }

    const [ postText,setPostText ] = useState('');

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
                            <div className="output-header">
                                <p className="font__bold font__p app_color_font">POST ADDED</p>
                            </div>
                            <div className="output-buttons-wrapper">
                                <div className="output-buttons">
                                    <div 
                                    className="new-post output-button app_color_background" 
                                    onClick={() => clearPost()}>
                                        <p className="p__size font__p">Add New Post</p>
                                    </div>
                                    <div className="view-comment output-button app_color_background">
                                        <Link to="/topics" className="white__color__font" style={{ textDecoration: 'none' }}>
                                            <p className="p__size font__p">
                                                    View Posts
                                            </p>
                                        </Link>
                                    </div>
                                </div>
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
