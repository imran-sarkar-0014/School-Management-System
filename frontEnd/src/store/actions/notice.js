import { ADD_NOTICE, SET_NOTICE, UPDATE_NOTICE, DELETE_NOTICE, RESET_NOTICE } from './actionTypes'



export const setNotice = (notices) => {
    return {
        type: SET_NOTICE,
        payload: notices
    }
}

export const resetNotice = () => {
    return {
        type: RESET_NOTICE
    }
}


export const addNotice = (notice) => {
    return {
        type: ADD_NOTICE,
        payload: notice
    }
}

export const updateNotice = (notice) => {
    return {
        type: UPDATE_NOTICE,
        payload: {
            id: notice._id,
            notice
        }
    }
}

export const deleteNotice = (id) => {
    return {
        type: DELETE_NOTICE,
        payload: id
    }
}