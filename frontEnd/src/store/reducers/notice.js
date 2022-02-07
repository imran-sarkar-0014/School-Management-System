import { ADD_NOTICE, SET_NOTICE, UPDATE_NOTICE, DELETE_NOTICE, RESET_NOTICE } from '../actions/actionTypes'


const inital = []

const noticeReducer = (state = inital, action) => {
    switch (action.type) {
        case SET_NOTICE:
            return action.payload

        case RESET_NOTICE:
            return inital

        case ADD_NOTICE:
            return [action.payload, ...state]

        case UPDATE_NOTICE:
            return state.filter(note => {
                if (note._id === action.payload.id) {

                    Object.keys(action.payload.notice).map(key => {
                        note[key] = action.payload.notice[key]
                    })

                    return note

                } else
                    return note
            })

        case DELETE_NOTICE:
            return state.filter(note => note._id !== action.payload)

        default: return state
    }
}




export default noticeReducer









