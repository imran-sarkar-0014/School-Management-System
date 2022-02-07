import React from 'react'
import CardView from '../../../components/CardView';
import { useSelector } from 'react-redux';
import ControllModel from '../../../components/ControllModel';
import { useState } from 'react';
import PaySalary from '../../../components/Paysalary';

import { payTeacherSalary } from '../../../api/expressApi'
import { useDispatch } from 'react-redux';
import { updateTeacher } from '../../../store/actions/transitions'

const ViewTeachers = () => {

    const teachers = useSelector(state => state.teachers);

    const [currentUser, setCurrentUser] = useState(null)
    const dispatch = useDispatch()
    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })


    const paySalary = (id, amount) => {

        payTeacherSalary(
            {
                id: id,
                amount: amount
            },
            // callback
            (data) => {

                dispatch(updateTeacher(data.user._id, {
                    pendingSalary: data.user.pendingSalary
                }))

                setCurrentUser(null)

                setResult({ ...result, success: true, msg: data.msg })
            },
            //fallback
            (err) => {
                setResult({ ...result, fail: true, msg: err })
            }
        )
    }

    return (
        <div className='grid mt-4 mx-3 lg:grid-cols-2 xl:grid-cols-3 space-y-4 lg:space-y-0 lg:space-x-4'>
            {
                teachers.map(tech => (
                    <CardView key={tech._id} details={tech} type='Teacher' setCurrentUser={setCurrentUser} />
                ))
            }

            {
                currentUser !== null &&
                <PaySalary paySalary={paySalary} currentUser={currentUser} setCurrentUser={setCurrentUser} heading="Teacher Salary Payment" />
            }

            <ControllModel result={result} setResult={setResult} />

        </div>
    )

}

export default ViewTeachers
