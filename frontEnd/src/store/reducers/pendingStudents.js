import { SET_PENDING_STUDENT } from '../actions/actionTypes'

const inital = []

const pendingStudents = (state = inital, action) => {
    switch (action.type) {
        case SET_PENDING_STUDENT:
            return action.payload
        default: return state
    }
}

export default pendingStudents