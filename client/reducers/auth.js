
const auth = (state = {}, action) => {
    switch(action.type) {
        case "LOG_IN":
            return Object.assign({}, state, {
                user: action.user
            });
        case "LOG_OUT":
            let newState = Object.assign({}, state);
            delete newState["user"];
            return newState;
        default:
            return state;
    }
};

export default auth;