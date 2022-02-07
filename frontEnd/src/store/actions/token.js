import { UPDATE_TOKEN } from "./actionTypes"

const updateToken = (type, value) => {
    return {
        type: UPDATE_TOKEN,
        payload: {
            type, value
        }
    }
}

export { updateToken }