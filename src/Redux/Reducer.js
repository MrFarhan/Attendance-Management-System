import { USER_DETAILS } from "./ActionTypes"
import { LOADING } from "./ActionTypes"


export const initialState = {
    userDetails: {},
    loading: true
}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DETAILS:
            console.log("user details reducer cosole", payload)
            return {
                ...state,
                userDetails: payload
            }
        case LOADING:
            console.log(" LOADING reducer cosole")

            return {
                ...state,
                loading: payload
            }

        default:
            return state
    }
}
