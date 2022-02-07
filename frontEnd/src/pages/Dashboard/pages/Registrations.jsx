import React, { useEffect, useState } from 'react'
import AdmissionViewCard from '../../../components/AdmissionViewCard'

import { acceptRegistration, deleteAdmission } from '../../../api/expressApi'


import { useSelector, useDispatch } from 'react-redux'
import { setPendingAdmin, setPendingTeacher } from '../../../store/actions/pending'
import { setTeacher, setAdmin } from '../../../store/actions/users'

const Registraions = () => {

    const dispatch = useDispatch()

    const pendingTeacher = useSelector(state => state.pendingTeacher)
    const pendingAdmin = useSelector(state => state.pendingAdmin)

    const teachers = useSelector(state => state.teachers)
    const admins = useSelector(state => state.admins)

    // handle admission acception
    const handleTeacherAdmission = (id, value) => {

        acceptRegistration({
            id, value
        }, (data) => {

            dispatch(setPendingTeacher(pendingTeacher.filter(tech => tech._id !== id)))
            dispatch(
                setTeacher([...teachers, data])
            )
        })

    }

    const handleAdminAdmission = (id, value) => {
        acceptRegistration({
            id, value
        }, (data) => {
            dispatch(setPendingAdmin(
                admins.filter(adm => adm._id !== data._id)
            ))
            dispatch(
                setAdmin([...admins, data])
            )
        })
    }

    // handle admission rejection
    const handleTeacherReject = (id) => {
        deleteAdmission(id, (data) => {
            dispatch(setPendingTeacher(pendingTeacher.filter(tech => tech._id !== id)))
        })
    }


    const handleAdminReject = (id) => {

        deleteAdmission(id, (data) => {
            if (id === data._id) {
                // Remove the admission from array
                dispatch(setPendingAdmin(pendingAdmin.filter(adm => adm._id !== id)))
            }
        })
    }

    return (

        <div className='flex flex-col'>
            <div>
                <h3 className='text-2xl px-4 py-3 text-gray-800'>Admission For Teacher</h3>
                <div className='grid md:space-x-2 md:grid-cols-1 lg:grid-cols-3'>
                    {
                        pendingTeacher.map(tech => (
                            <AdmissionViewCard key={tech._id} details={tech} type="Teacher" handleAdmit={handleTeacherAdmission} handleReject={handleTeacherReject} />
                        ))
                    }

                    {
                        pendingTeacher.length === 0 &&
                        <div className="text-center my-8 text-2xl text-gray-500 col-span-full">
                            Teacher Registration Empty
                        </div>
                    }

                </div>
            </div>

            {/* Admin */}
            <div>
                <h3 className='text-2xl px-4 py-3 text-gray-800'>Admission For Admin</h3>
                <div className='grid md:space-x-2 md:grid-cols-1 lg:grid-cols-3'>
                    {
                        pendingAdmin.map(admin => (
                            <AdmissionViewCard key={admin._id} details={admin} type="Admin" handleAdmit={handleAdminAdmission} handleReject={handleAdminReject} />
                        ))
                    }

                    {
                        pendingAdmin.length === 0 &&
                        <div className="text-center my-8 text-2xl text-gray-500 col-span-full">
                            Admin Registration Empty
                        </div>
                    }
                </div>
            </div>

        </div>

    )
}




export default Registraions
