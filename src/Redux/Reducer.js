import { ATTENDANCE, USER_DETAILS } from "./ActionTypes"
import { LOADING } from "./ActionTypes"


export const initialState = {
    userDetails: {},
    loading: true,
    attendance:{}

}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DETAILS:
            return {
                ...state,
                userDetails: payload
            }
        case LOADING:
            return {
                ...state,
                loading: payload
            }
        case ATTENDANCE:
            return {
                ...state,
                attendance: payload
            }

        default:
            return state
    }
}
