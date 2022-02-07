import { UPDATE_STUDENT, UPDATE_TEACHER, UPDATE_ADMIN } from './actionTypes'

export const updateStudent = (className, id, update) => {
    return {
        type: UPDATE_STUDENT,
        payload: {
            className: className,
            id: id,
            update: update
        }
    }
}

export const updateTeacher = (id, update) => {
    return {
        type: UPDATE_TEACHER,
        payload: {
            id,
            update
        }
    }
}

export const updateAdmin = (id, update) => {
    return {
        type: UPDATE_ADMIN,
        payload: {
            id,
            update
        }
    }
}