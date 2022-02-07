import { SET_TEACHER, UPDATE_TEACHER } from '../actions/actionTypes'

const inital = []

const teachers = (state = inital, action) => {
    switch (action.type) {

        case SET_TEACHER:
            return action.payload

        case UPDATE_TEACHER:
            return state.filter(tech => {
                if (tech._id === action.payload.id) {

                    Object.keys(action.payload.update).map(key => {
                        tech[key] = action.payload.update[key]
                    })

                    return tech

                } else
                    return tech
            })

        default: return state
    }
}

export default teachers