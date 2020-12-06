import { USER_DETAILS, LOADING, ATTENDANCE } from "./ActionTypes"


export const userDetailsAction = (payload) => ({
    type: USER_DETAILS,
    payload
})

export const attendanceAction = (payload) => ({
    type: ATTENDANCE,
    payload
})

export const loadingAction = (payload) => ({
    type: LOADING,
    payload: payload
})

