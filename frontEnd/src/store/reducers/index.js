import { combineReducers } from 'redux'
import userReducer from './userReducer'
import tokenReducer from './tokenReducer'

import pendingAdmin from './pendingAdmin'
import pendingStudents from './pendingStudents'
import pendingTeacher from './pendingTeacher'

import admin from './admin'
import teachers from './teachers'
import students from './students'

import attendanceReducer from './attendance'
import noticeReducer from './notice'

import fundReducer from './fund'

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    pendingAdmin: pendingAdmin,
    pendingStudents: pendingStudents,
    pendingTeacher: pendingTeacher,
    admins: admin,
    teachers: teachers,
    students: students,
    attendance: attendanceReducer,
    notice: noticeReducer,
    fund: fundReducer,
})

export default rootReducer