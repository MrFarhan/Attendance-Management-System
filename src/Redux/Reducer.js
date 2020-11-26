import { USER_DETAILS } from "./ActionTypes"
import { LOADING } from "./ActionTypes"


export const initialState = {
    userDetails: false,
    loading: true
}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DETAILS:
            console.log("reducer cosole")
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
