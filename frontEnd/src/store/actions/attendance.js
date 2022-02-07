import { SET_ATTENDANCE, ADD_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE, RESET_ATTENDANCE } from '../actions/actionTypes'

export const setAttendance = (attends) => {
    return {
        type: SET_ATTENDANCE,
        payload: attends
    }
}

export const addAttendance = (className, attend) => {
    return {
        type: ADD_ATTENDANCE,
        className: className,
        payload: attend
    }
}

export const deleteAttendance = (className, id) => {
    return {
        type: DELETE_ATTENDANCE,
        className: className,
        payload: id
    }
}

export const updateAttendance = (className, attend) => {
    return {
        type: UPDATE_ATTENDANCE,
        className: className,
        payload: attend
    }
}

export const resetAttendence = () => {
    return {
        type: RESET_ATTENDANCE
    }
}