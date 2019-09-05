import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOG_OUT
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: {},
    users: {},
    errors: {}
};

const auth = (state = initialState, action) => {
    const { type,payload } = action;
    switch(type){
        case USER_LOADED:
            localStorage.getItem('token');
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                isLoading: true
            }
        default:
            return state;
    }
}

export default auth;