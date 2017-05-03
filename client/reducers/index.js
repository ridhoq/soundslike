import { combineReducers } from "redux";
import auth from "./auth"

const soundsLikeReducer = combineReducers({
    auth
});

export default soundsLikeReducer;