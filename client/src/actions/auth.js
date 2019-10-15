import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOG_OUT,
    CHANGE_EMAIL,
    CHANGE_LAST_NAME,
    CHANGE_USERNAME,
    CHANGE_NAME
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
};

export const changeEmail = (new_email) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ new_email });
        let res = await axios.post('http://localhost:5000/api/users/change_email',body,config);
        dispatch({
            type: CHANGE_EMAIL,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR });
    }
}

export const changeUsername = (new_username) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ new_username });
        let res = await axios.post('http://localhost:5000/api/users/change_username',body,config);
        dispatch({
            type: CHANGE_USERNAME,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR });
    }
}

export const changeName = (new_name) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ new_name });
        let res = await axios.post('http://localhost:5000/api/users/change_name',body,config);
        dispatch({
            type: CHANGE_NAME,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR });
    }
}

export const changeLastName = (new_last_name) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ new_last_name });
        let res = await axios.post('http://localhost:5000/api/users/change_last_name',body,config);
        dispatch({
            type: CHANGE_LAST_NAME,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: AUTH_ERROR });
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