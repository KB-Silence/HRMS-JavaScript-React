import { USER_LOGIN, USER_LOGOUT } from "../Actions/authActions";
import { authInitial } from "../InitialValues/authInitial";

const initialState = {
    authInitial:authInitial
}

export default function authReducer(state=initialState, {type,payload}) {
    switch(type) {
        case USER_LOGIN:
            return {
                ...state,
                authInitial:[...[{login:true, user:payload}]]
            }
        case USER_LOGOUT:
            return {
                ...state,
                authInitial:[{login:false, user:{userId:0, userType:0}}]
            }
        default:
            return state
    }
}