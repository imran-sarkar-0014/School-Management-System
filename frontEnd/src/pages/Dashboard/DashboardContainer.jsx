import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// importing pages
import Admissions from './pages/Admissions'
import Registrations from './pages/Registrations'
import Attendance from './pages/Attendance'
import Home from './pages/Home'
import Notices from './pages/Notices'
import Profile from './pages/Profile'
import ViewAccounts from './pages/ViewAccounts'
import ViewClasses from './pages/ViewClasses'
import ViewStudents from './pages/ViewStudents'
import ViewTeachers from './pages/ViewTeachers'
import ViewAdmin from './pages/ViewAdmin'
import Fund from './pages/Fund'


const DashboardContainer = (props) => {

    return (
        <div className={`${props.wMin ? 'ml-16' : ''} flex-1 shadow-pink-30 overflow-y-scroll`}>


            {/* some routes will be blocked for students and teachers */}
            <Routes>

                {/* Anyone can explore */}
                <Route path="/*" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/accounts" element={<ViewAccounts />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/Notice" element={<Notices />} />
                <Route path="/teachers" element={<ViewTeachers />} />
                <Route path="/admins" element={<ViewAdmin />} />


                {/* Only admin can explore */}
                {
                    props.user.type === 'Admin' &&
                    <>
                        <Route path="/admission" element={<Admissions />} />
                        <Route path="/fund" element={<Fund />} />
                        <Route path="/registrations" element={<Registrations />} />
                    </>
                }

                {/* Only admin and Teacher can explore */}
                {
                    props.user.type !== 'Student' &&
                    <>
                        <Route path="/classes" element={<ViewClasses />} />
                    </>
                }
                <Route path="/students/:className" element={<ViewStudents />} />


            </Routes >
        </div >
    )
}

export default DashboardContainer
