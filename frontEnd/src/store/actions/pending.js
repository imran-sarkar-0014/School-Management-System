import { SET_PENDING_STUDENT, SET_PENDING_TEACHER, SET_PENDING_ADMIN } from './actionTypes'


export const setPendingStudents = (newValue) => {
    return {
        type: SET_PENDING_STUDENT,
        payload: newValue
    }
}

export const setPendingTeacher = (newValue) => {
    return {
        type: SET_PENDING_TEACHER,
        payload: newValue
    }
}

export const setPendingAdmin = (newValue) => {
    return {
        type: SET_PENDING_ADMIN,
        payload: newValue
    }
}