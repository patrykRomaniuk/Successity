import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOG_OUT,
    GET_USERS,
    SEARCH_USERS,
    CHANGE_EMAIL,
    CHANGE_LAST_NAME,
    CHANGE_USERNAME,
    CHANGE_NAME,
    CHANGE_REJECT
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
        case GET_USERS:
        case SEARCH_USERS:
            return {
                ...state,
                ...payload,
                users: payload
            }
        case USER_LOADED:
        case CHANGE_EMAIL:
        case CHANGE_LAST_NAME:
        case CHANGE_USERNAME:
        case CHANGE_NAME:
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
                post: null,
                posts: null,
                isAuthenticated: false,
                isLoading: true
            }
        case CHANGE_REJECT:
            return {
                ...state,
                ...payload,
                post: null,
                posts: null,
                errors: payload
            }
        default:
            return state;
    }
}

export default auth;