import { SET_PENDING_ADMIN } from '../actions/actionTypes'

const inital = []

const pendingAdmin = (state = inital, action) => {
    switch (action.type) {
        case SET_PENDING_ADMIN:
            return action.payload
        default: return state
    }
}

export default pendingAdmin