import { UUID } from "./ActionTypes"

export const initialState = {
    uuid: false
}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case UUID:
            console.log("reducer cosole")
            return {
                ...state,
                uuid: payload
            }
        default:
            return state
    }
}
