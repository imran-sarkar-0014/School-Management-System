import './App.css';
import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as Pages from './pages'
import 'aos'

import Aos from 'aos'
import 'aos/dist/aos.css'


import { updateToken } from './store/actions/token'
import { resetUser, setUser } from './store/actions/user'
import { setNotice, resetNotice } from './store/actions/notice'
import { setAttendance, resetAttendence } from './store/actions/attendance';

import { setPendingAdmin, setPendingTeacher, setPendingStudents } from './store/actions/pending'
import { setAdmin, setTeacher, addStudents } from './store/actions/users';
import { resetFund, setFund } from './store/actions/fund';
// api 

import {
  setAuthorization, getStudent, getTeacher,
  getAdmin, getPendingStudents, getPendingTeachers,
  getPendingAdmins, getAdmins, getTeachers, classStudents,
  getNotices,
  getAttendance,
  getFund
} from './api/expressApi'


const totalClasses = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
]


const getAllStudents = (callback) => {


  totalClasses.forEach(className => {

    classStudents(className, (studs) => {
      let obj = {}
      obj[className] = studs
      callback(obj)

    })
  })
}

const getAllAttendance = (callback) => {
  totalClasses.forEach(className => {

    getAttendance({ className, limit: 30 },
      // callback
      (attend) => {
        let obj = {}
        obj[className] = attend
        callback(obj)
      })
  })
}





function App() {



  /// Animation On Scroll initialization
  useEffect(() => {
    Aos.init({
      duration: 1200,
    })
  }, [])

  const token = useSelector(state => state.token)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {

    const loginType = localStorage.getItem('loginType')
    const tok = localStorage.getItem('token')

    if (tok && loginType) {
      dispatch(updateToken(loginType, tok))
    }


  }, [])



  // loggin into application
  useEffect(() => {

    dispatch(resetUser())
    dispatch(resetFund())
    dispatch(resetNotice())
    dispatch(resetAttendence())


    setAuthorization(token.value)

    if (!token.type)
      return

    switch (token.type) {

      case 'Student':
        getStudent((data) => {
          dispatch(setUser(data))

          getAttendance({ className: data.currentClass, limit: 30 },
            (attends) => {
              const obj = {}
              obj[data.currentClass] = attends
              dispatch(setAttendance(obj))
            })

          classStudents(data.currentClass, (studs) => {
            const obj = {}
            obj[data.currentClass] = studs
            dispatch(addStudents(obj))
          })

        })

        break

      case 'Teacher':
        getTeacher((data) => {
          dispatch(setUser(data))
        })

        getAllAttendance((attend) => {
          dispatch(setAttendance(attend))
        })
        getAllStudents((students) => {
          dispatch(addStudents(students))
        })

        break

      case 'Admin':
        getAdmin(data => {
          dispatch(setUser(data))
        })

        getPendingStudents((students) => {
          dispatch(setPendingStudents(students))
        })

        getPendingTeachers((data) => {
          dispatch(setPendingTeacher(data))
        })

        getPendingAdmins((data) => {
          dispatch(setPendingAdmin(data))
        })

        getAllStudents((students) => {
          dispatch(addStudents(students))
        })

        getAllAttendance((attend) => {
          dispatch(setAttendance(attend))
        })

        getFund((data) => {
          dispatch(setFund(data))
        })


    }

    getNotices((notices) => {
      dispatch(setNotice(notices))
    })

    // get all attendances


    getAdmins((data) => {
      dispatch(setAdmin(data))
    })

    getTeachers((data) => {
      dispatch(setTeacher(data))
    })


  }, [token])


  const loadedUser = useRef()

  return (
    <div className='h-screen  items-center justify-center'>
      <Routes>
        <Route path='/*' element={<Pages.Home />} />
        <Route path='/services' element={<Pages.Services />} />
        <Route path='/services' element={<Pages.Services />} />
        <Route path='/Login' element={<Pages.Login />} />
        <Route path='/register' element={<Pages.Register />} />
        <Route path='/dashboard/*' element={<Pages.Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;


