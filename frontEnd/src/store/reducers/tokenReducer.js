import { UPDATE_TOKEN } from "../actions/actionTypes"

const initial = {
    type: '',
    value: ''
}

const tokenReducer = (state = initial, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return action.payload
        default: return state
    }
}

export default tokenReducer