import {
    GET_USER,     
    GET_USER_POSTS,   
    GET_POSTS_BY_USER_ID
} from '../actions/constants';

const initialState = {
    userProfile: null,
    profilePosts: null
}

const user = (state = initialState,action) => {
    const { type,payload } = action;
    switch(type){
        case GET_USER:
            return {
                ...state,
                userProfile: payload
            }
        case GET_POSTS_BY_USER_ID:
        case GET_USER_POSTS:
            return {
                ...state,
                profilePosts: payload
            }
        default:
            return state;
    }
}

export default user;