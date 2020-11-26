import { USER_DETAILS, LOADING } from "./ActionTypes"


export const userDetailsAction = (payload) => ({
    type: USER_DETAILS,
    payload
})

export const loadingAction = (payload) => ({
    type: LOADING,
    payload: payload
})
