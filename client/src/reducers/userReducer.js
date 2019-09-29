import {
    GET_USER
} from '../actions/constants';

const initialState = {
    userProfile: null
}

const user = (state = initialState,action) => {
    const { type,payload } = action;
    switch(type){
        case GET_USER:
            return {
                userProfile: payload
            }
        default:
            return state;
    }
}

export default user;