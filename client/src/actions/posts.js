import { 
    MAKE_POST,
    POST_ERROR,
    REMOVE_POST,
    GET_POST,
    GET_POSTS,
    POST_CLEAR,
    SEARCH_TOPICS,
    LATEST_POSTS,
    MOST_LIKED_POSTS,
    MOST_COMMENTED,
    MAKE_COMMENT,
    ADD_LIKE,
    LIKE_COMMENT,
    REMOVE_LIKE
} from './constants';
import { getUserPosts } from './users';
import axios from 'axios';

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

export const getPost = (post_id) => async dispatch => {
    try {
        dispatch(clearPost());
        const res = await axios.get(`https://shrouded-wave-01076.herokuapp.com/api/posts/post/${post_id}`);
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
        const res = await axios.get('https://shrouded-wave-01076.herokuapp.com/api/posts/latest');
        dispatch({
            type: LATEST_POSTS,
            payload: res.data
        });
        dispatch(clearPost());
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const getMostCommented = () => async dispatch => {
    try {
        const res = await axios.get('https://shrouded-wave-01076.herokuapp.com/api/posts/posts/most_commented');
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
        const res = await axios.get(`https://shrouded-wave-01076.herokuapp.com/api/posts/posts/most_liked`);
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
        const res = await axios.get('https://shrouded-wave-01076.herokuapp.com/api/posts/posts');
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
        const res = await axios.post('https://shrouded-wave-01076.herokuapp.com/api/posts',body,config);
        dispatch({
            type: MAKE_POST,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
};

export const makeComment = (post_id,text) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ text })
        const res = await axios.put(`https://shrouded-wave-01076.herokuapp.com/api/posts/comments/${post_id}`,body,config);
        dispatch({
            type: MAKE_COMMENT,
            payload: res.data
        });
        dispatch(getPost(post_id));
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const likeComment = (post_id,comment_id) => async dispatch => {
    try {
        const res = await axios.put(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/${post_id}/${comment_id}`);
        dispatch({
            type: LIKE_COMMENT,
            payload: res.data
        });
        dispatch(getPost(post_id));
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: POST_ERROR
        });
    }
}

export const searchTopics = searchValue => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ searchValue });
        const res = await axios.post('https://shrouded-wave-01076.herokuapp.com/api/posts/search_post',body,config);
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
        const res = await axios.put(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/${like_id}`);
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

export const addLikePostPage = (like_id) => async dispatch => {
    try {
        const res = await axios.put(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/${like_id}`);
        dispatch({
            type: ADD_LIKE,
            payload: res.data
        });
        dispatch(getPost(like_id));
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR })
    }
}

export const removeLikeFromTopicPage = (post_id,like_id,isOldest,isLatest,isMostCommented,isMostLiked) => async dispatch => {
    try {
        const res = await axios.delete(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/${post_id}/${like_id}`);
        dispatch({
            type: REMOVE_LIKE,
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
        dispatch({ type: POST_ERROR });
    }
}

export const removeLikeFromPostPage = (post_id,like_id) => async dispatch => {
    try {
        const res = await axios.delete(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/${post_id}/${like_id}`);
        dispatch({
            type: REMOVE_LIKE,
            payload: res.data
        });
        dispatch(getPost(post_id));
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const removeLikeFromComment = (post_id,comment_id,like_id) => async dispatch => {
    try {
        const res = await axios.delete(`https://shrouded-wave-01076.herokuapp.com/api/posts/likes/remove_comment_like/${post_id}/${comment_id}/${like_id}`);
        dispatch({
            type: REMOVE_LIKE,
            payload: res.data
        });
        dispatch(getPost(post_id));
    } catch (error) {
        console.log(error.message);
        dispatch({ type: POST_ERROR });
    }
}

export const removePost = post_id => async dispatch => {
    try {
        const res = await axios.delete(`https://shrouded-wave-01076.herokuapp.com/api/posts/${post_id}`);
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