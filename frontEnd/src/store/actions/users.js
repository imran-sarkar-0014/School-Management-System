import { SET_ADMIN, SET_TEACHER, SET_STUDENT, ADD_STUDENTS, ADD_STUDENT } from './actionTypes'

export const setAdmin = (adm) => {
    return {
        type: SET_ADMIN,
        payload: adm
    }
}

export const setTeacher = (tech) => {
    return {
        type: SET_TEACHER,
        payload: tech
    }
}

export const setStudent = (stud) => {
    return {
        type: SET_STUDENT,
        payload: stud
    }
}
export const addStudents = (stds) => {
    return {
        type: ADD_STUDENTS,
        payload: stds
    }
}

export const addStudent = (stud) => {
    return {
        type: ADD_STUDENT,
        payload: stud
    }
}