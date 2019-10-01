import axios from 'axios';
import { 
    GET_USERS,
    AUTH_ERROR,
    SEARCH_USERS,
    GET_USER_POSTS,
    GET_USER,
    GET_POSTS_BY_USER_ID,
    POST_ERROR
} from './constants';

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/users/users');
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: AUTH_ERROR
        })
    }
}

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

export const getUserPostsByUserId = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/posts/user_posts/posts/${user_id}`);
        dispatch({
            type: GET_POSTS_BY_USER_ID,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const getUserById = user_id => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/users/user/id/${user_id}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR });
    }
}

export const searchUsers = (searchValue) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ searchValue });
        const res = await axios.put(`http://localhost:5000/api/users`,body,config);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR })
    }
}