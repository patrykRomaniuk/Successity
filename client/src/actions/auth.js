import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED 
} from './constants';
import axios from 'axios';

export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/users');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const registerUser = ( name,last_name,username,email,password ) => async dispatch => {
    try {
        const body = JSON.stringify({ name,last_name,username,email,password });
        const config = {
            'Content-Type': 'application/json'
        };
        const res = await axios.post('http://localhost:5000/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const loginUser = ( email,password ) => async dispatch => {
    try {
        const config = {
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({ email,password });
        const res = await axios.post('http://localhost:5000/api/users/login',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: LOGIN_FAIL
        });
    }
}