import {
    MAKE_POST,
    POST_ERROR,
    GET_USER_POSTS,
    GET_POSTS,
    GET_POST,
    REMOVE_POST,
    SEARCH_TOPICS,
    POST_CLEAR
} from '../actions/constants'

const initialState = {
    posts: [],
    post: null,
    isLoading: true,
    errors: {}
}

const post = (state = initialState,action) => {
    const { type,payload } = action;
    switch(type){
        case POST_CLEAR:
            return {
                ...state,
                post: null
            }
        case MAKE_POST:
        case GET_POST:
        case GET_USER_POSTS:
            return {
                ...state,
                isLoading: false,
                post: payload
            }
        case GET_POSTS:
        case SEARCH_TOPICS:
            return {
                ...state,
                isLoading: false,
                posts: payload
            }
        case POST_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: payload
            }
        default:
            return state;
    }
}

export default post;