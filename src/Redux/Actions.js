import { USER_DETAILS} from "./ActionTypes"
// import { FB_CURRENT_USER } from "./ActionTypes"


export const userDetailsAction = (payload) => ({
    type: USER_DETAILS,
    payload
})

// export const currentUserAction = (payload) => ({
//     type: FB_CURRENT_USER,
//     payload
// })
