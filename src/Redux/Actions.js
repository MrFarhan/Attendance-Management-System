import { USER_DETAILS, LOADING } from "./ActionTypes"
// import { FB_CURRENT_USER } from "./ActionTypes"


export const userDetailsAction = (payload) => ({
    type: USER_DETAILS,
    payload
})

export const loadingAction = (payload) => ({
    type: LOADING,
    payload: payload
})

// export const currentUserAction = (payload) => ({
//     type: FB_CURRENT_USER,
//     payload
// })
