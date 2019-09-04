import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED 
} from './constants';
import axios from 'axios';

export const registerUser = ( name,last_name,username,email,password ) => dispatch => {
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
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: REGISTER_FAIL
        });
    }
}