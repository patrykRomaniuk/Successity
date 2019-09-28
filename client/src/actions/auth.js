import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOG_OUT
} from './constants';
import axios from 'axios';
import setAuthToken from '../middleware/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    }
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
};

export const registerUser = ( name,last_name,username,email,password ) => async dispatch => {
    try {
        const body = JSON.stringify({ name,last_name,username,email,password });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
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
            headers: {
                'Content-Type': 'application/json'
            }
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

export const logOut = () => async dispatch => {
    try {
        dispatch({
            type: LOG_OUT
        });
    } catch (error) {
        console.log(error.message);
    }
}