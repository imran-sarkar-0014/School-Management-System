import { SET_ADMIN, UPDATE_ADMIN } from '../actions/actionTypes'

const inital = []

const admin = (state = inital, action) => {
    switch (action.type) {

        case SET_ADMIN:
            return action.payload

        case UPDATE_ADMIN:
            return state.filter(adm => {
                if (adm._id === action.payload.id) {

                    Object.keys(action.payload.update).map(key => {
                        adm[key] = action.payload.update[key]
                    })

                    return adm

                } else
                    return adm

            })

        default: return state
    }
}

export default admin