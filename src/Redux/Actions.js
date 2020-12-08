import { USER_DETAILS, LOADING, ATTENDANCE, ALL_USERS_DETAILS, ALL_USERS_ATTENDANCE_DETAILS } from "./ActionTypes"


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


export const allUserDetailsAction = (payload) => ({
    type: ALL_USERS_DETAILS,
    payload: payload
})

export const allUserAttendanceAction = (payload) => ({
    type: ALL_USERS_ATTENDANCE_DETAILS,
    payload: payload
})


