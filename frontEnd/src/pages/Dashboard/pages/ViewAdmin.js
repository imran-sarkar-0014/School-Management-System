import React, { useState } from 'react'

import CardView from '../../../components/CardView'
import { useDispatch, useSelector } from 'react-redux';
import ControllModel from '../../../components/ControllModel';
import PaySalary from '../../../components/Paysalary';

import { payAdminSalary } from '../../../api/expressApi'
import { updateAdmin } from '../../../store/actions/transitions'


const ViewAdmin = () => {

    const admins = useSelector(state => state.admins);

    const [currentUser, setCurrentUser] = useState(null)
    const dispatch = useDispatch()
    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    const paySalary = (id, amount) => {

        payAdminSalary(
            {
                id: id,
                amount: amount
            },
            // callback
            (data) => {

                dispatch(updateAdmin(data.user._id, {
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
                admins.map(adm => (
                    <CardView key={adm._id} details={adm} type='Admin' setCurrentUser={setCurrentUser} />
                ))
            }

            {
                currentUser !== null &&
                <PaySalary paySalary={paySalary} currentUser={currentUser} setCurrentUser={setCurrentUser} heading="Admin Salary Payment" />
            }

            <ControllModel result={result} setResult={setResult} />
        </div>
    )
}




export default ViewAdmin
