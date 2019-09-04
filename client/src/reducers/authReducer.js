
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {},
    users: {},
    errors: {}
};

const auth = (state = initialState, action) => {
    const { type,payload } = action;
    switch(type){
        default:
            return state;
    }
}

export default auth;