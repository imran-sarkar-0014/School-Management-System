import { SET_FUND, RESET_FUND } from '../actions/actionTypes'
const inital = {}


const fundReducer = (state = inital, action) => {
    switch (action.type) {

        case SET_FUND:
            return action.payload

        case RESET_FUND:
            return inital

        default: return state
    }
}


export default fundReducer















