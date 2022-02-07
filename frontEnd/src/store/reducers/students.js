import { SET_STUDENT, ADD_STUDENTS, ADD_STUDENT, UPDATE_STUDENT } from '../actions/actionTypes'

const inital = {}

const students = (state = inital, action) => {
    switch (action.type) {

        case SET_STUDENT:
            return action.payload

        case ADD_STUDENTS:
            return { ...state, ...action.payload }

        case ADD_STUDENT:
            state[action.payload.currentClass] = [...state[action.payload.currentClass], action.payload]
            return state


        case UPDATE_STUDENT:

            state[action.payload.className] = state[action.payload.className].filter(stud => {

                if (stud._id === action.payload.id) {

                    Object.keys(action.payload.update).map(key => {
                        stud[key] = action.payload.update[key]
                    })
                    return stud

                } else
                    return stud

            })

            return state

        default: return state
    }
}

export default students