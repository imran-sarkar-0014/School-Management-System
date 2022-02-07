import { SET_PENDING_TEACHER } from '../actions/actionTypes'

const inital = []

const pendingTeacher = (state = inital, action) => {
    switch (action.type) {
        case SET_PENDING_TEACHER:
            return action.payload
        default: return state
    }
}

export default pendingTeacher