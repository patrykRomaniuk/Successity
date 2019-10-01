import {
    MAKE_POST,
    POST_ERROR,
    GET_POSTS,
    GET_POST,
    MOST_LIKED_POSTS,
    MOST_COMMENTED,
    SEARCH_TOPICS,
    LATEST_POSTS,
    POST_CLEAR,
    REMOVE_COMMENT_LIKE
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
        case REMOVE_COMMENT_LIKE:
            return {
                ...state,
                isLoading: false,
                post: payload
            }
        case GET_POSTS:
        case LATEST_POSTS:
        case SEARCH_TOPICS:
        case MOST_COMMENTED:
        case MOST_LIKED_POSTS:
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