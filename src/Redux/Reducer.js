import { USER_DETAILS } from "./ActionTypes"

export const initialState = {
    userDetails: false,
    // fbCurrentUser: ""
}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DETAILS:
            console.log("reducer cosole")
            return {
                ...state,
                userDetails: payload
            }
        // case FB_CURRENT_USER:
        //     return {
        //         ...state,
        //         fbCurrentUser: payload
        //     }
        default:
            return state
    }
}
