import { SET_ACTIVE, SET_DEFAULT } from "../Actions/naviActions";
import { naviInitials } from "../InitialValues/naviInitials";

const initialState = {
    naviInitials: naviInitials
}

export default function naviReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_ACTIVE:
            return {
                ...state,
                naviInitials: { itemName: payload }
            }
        case SET_DEFAULT:
            return {
                ...state,
                naviInitials: { itemName: "null" }
            }
        default:
            return state
    }
}