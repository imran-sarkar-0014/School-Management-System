
import { ADD_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE, RESET_ATTENDANCE, SET_ATTENDANCE } from '../actions/actionTypes'

const inital = {}

const attendanceReducer = (state = inital, action) => {


    switch (action.type) {

        case RESET_ATTENDANCE:
            return inital

        case SET_ATTENDANCE:
            state = { ...state, ...action.payload }
            return state

        case ADD_ATTENDANCE:
            state[action.className] = [action.payload, ...state[action.className]]
            return state

        case UPDATE_ATTENDANCE:
            state[action.className] = state[action.className].filter(a => {
                if (a._id === action.payload.id) {
                    return action.payload.attend
                } else {
                    return a
                }
            })

            return state

        case DELETE_ATTENDANCE:
            state[action.className] = state[action.className].filter(a => a._id !== action.payload)
            return state

        default: return state
    }
}

export default attendanceReducer










