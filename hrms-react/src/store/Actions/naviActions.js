export const SET_ACTIVE = "SET_ACTIVE"
export const SET_DEFAULT = "SET_DEFAULT"

export function setActive(itemName) {
    return {
        type: SET_ACTIVE,
        payload: itemName
    }
}

export function setDefault() {
    return {
        type: SET_DEFAULT
    }
}