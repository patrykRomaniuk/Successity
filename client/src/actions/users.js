import axios from 'axios';
import { 
    GET_USERS,
    AUTH_ERROR,
    SEARCH_USERS,
    GET_USER_POSTS
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