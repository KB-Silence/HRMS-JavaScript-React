import { combineReducers } from "redux";
import authReducer from "./Reducers/authReducer";
import naviReducer from "./Reducers/naviReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    navi:naviReducer
})

export default rootReducer;