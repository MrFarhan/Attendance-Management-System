import { ALL_USERS_DETAILS, ATTENDANCE, USER_DETAILS,ALL_USERS_ATTENDANCE_DETAILS } from "./ActionTypes"
import { LOADING } from "./ActionTypes"


export const initialState = {
    userDetails: {},
    loading: true,
    attendance: {},
    allUserDetails: {},
    allUsersAttendanceDetails:{}

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
        case ALL_USERS_DETAILS:
            return {
                ...state,
                allUserDetails: payload
            }
        case ALL_USERS_ATTENDANCE_DETAILS:
            return {
                ...state,
                allUsersAttendanceDetails: payload
            }
        default:
            return state
    }
}
