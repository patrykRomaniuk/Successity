import { 
    MAKE_POST,
    POST_ERROR,
    GET_USER_POSTS,
    REMOVE_POST,
    GET_POST,
    GET_POSTS,
    POST_CLEAR,
    SEARCH_TOPICS,
    LATEST_POSTS,
    MOST_LIKED_POSTS,
    MOST_COMMENTED,
    ADD_LIKE,
    REMOVE_LIKE
} from './constants';
import axios from 'axios';

export const getUserPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/posts/user_posts');
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const getPost = (post_id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/post/${post_id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const getLatestPosts = () =>  async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/latest');
        dispatch({
            type: LATEST_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const getMostCommented = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/posts/most_commented');
        dispatch({
            type: MOST_COMMENTED,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const getMostLikedPosts = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/posts/most_liked`);
        dispatch({
            type: MOST_LIKED_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const makePost = text => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ text });
        const res = await axios.post('http://localhost:5000/api/posts',body,config);
        dispatch({
            type: MAKE_POST,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
};

export const searchTopics = searchValue => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ searchValue });
        const res = await axios.post('http://localhost:5000/api/posts/search_post',body,config);
        dispatch({
            type: SEARCH_TOPICS,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
};

export const addLike = (like_id,isOldest,isLatest,isMostCommented,isMostLiked) =>  async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/likes/${like_id}`);
        dispatch({
            type: ADD_LIKE,
            payload: res.data
        });
        if(isOldest){
            dispatch(getPosts());
        } else if(isLatest) {
            dispatch(getLatestPosts());
        } else if(isMostCommented){
            dispatch(getMostCommented());
        } else if (isMostLiked){
            dispatch(getMostLikedPosts());
        }
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const removeLike = (post_id,like_id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/likes/${post_id}/${like_id}`);
        dispatch({
            type: REMOVE_LIKE,
            payload: res.data
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const removePost = post_id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${post_id}`);
        dispatch({
            type: REMOVE_POST,
            payload: res.data
        });
        dispatch(getUserPosts());
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const clearPost = () => async dispatch => {
    try {
        dispatch({
            type: POST_CLEAR
        });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}