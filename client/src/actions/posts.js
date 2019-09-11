import { 
    MAKE_POST,
    POST_ERROR,
    GET_USER_POSTS,
    REMOVE_POST,
    GET_POST,
    GET_POSTS,
    POST_CLEAR
} from './constants';
import axios from 'axios';

export const getUserPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/posts/user_posts');
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const getPost = (post_id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/post/${post_id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const makePost = (text) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ text });
        const res = await axios.post('http://localhost:5000/api/posts',body,config);
        dispatch({
            type: MAKE_POST,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const removePost = (post_id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${post_id}`);
        dispatch({
            type: REMOVE_POST,
            payload: res.data
        });
        dispatch(getUserPosts());
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const clearPost = () => async dispatch => {
    try {
        dispatch({
            type: POST_CLEAR
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}