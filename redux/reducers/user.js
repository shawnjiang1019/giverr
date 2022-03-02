import { USER_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser : null,
    posts: []
}

export const user = (state = initialState, action) => {

    return {
        ...state,
        currentUser : action.currentUser,
        posts: action.posts
    }
}