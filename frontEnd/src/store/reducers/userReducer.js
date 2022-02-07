import { SET_USER, RESET_USER } from '../actions/actionTypes'

const inital = {}

const userReducer = (state = inital, action) => {
    switch (action.type) {

        case SET_USER: return action.payload

        case RESET_USER: return inital

        default: return state
    }
}

export default userReducer