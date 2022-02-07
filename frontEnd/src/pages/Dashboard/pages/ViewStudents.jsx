import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetailItem from '../../../components/DetailItem'
import ControllModel from '../../../components/ControllModel'

import Model from '../../../components/Model'
import { getStudentFee } from '../../../api/expressApi'
import { useDispatch } from 'react-redux'
import { updateStudent } from '../../../store/actions/transitions'

/// model for taking school fee from student
const ModelOfFees = ({ result, setResult, setIsOpen, std }) => {

    const [payTotal, setPayTotal] = useState(std.fees)
    const dispatch = useDispatch()

    const onclickAway = () => {
        setIsOpen(false)
    }

    const onPaymentSubmit = (id) => {

        if (payTotal < 1) {
            alert('Cannot pay Zero Balance.')
            return
        }

        getStudentFee(

            // Arguments
            {
                id: id,
                amount: payTotal
            },

            // success Callback
            (data) => {
                dispatch(updateStudent(data.user.currentClass, data.user._id,
                    {
                        outstandingFees: data.user.outstandingFees
                    }

                ))
                setResult({ ...result, success: true, msg: data.msg })
                setIsOpen(false)
            },

            // failure callback
            (msg) => {
                setResult({ ...result, fail: true, msg: msg })
                setIsOpen(false)
            })
    }

    return (
        <div>

            <Model clickAway={onclickAway} >

                <h3 className='text-center font-medium text-2xl m-3'>Taking Fees</h3>
                <div className='mt-4'>
                    <DetailItem label="Name" value={std.name} />
                    <DetailItem label="Email" value={std.email} />
                    <DetailItem label="Monthly Fees" value={std.fees} />
                    <DetailItem label="Pending" value={std.outstandingFees} />
                </div>

                <div className='p-4 pt-8 bg-gray-200 my-4'>

                    <h4 className='font-medium text-xl '>Paying Fees</h4>

                    <input className='bg-white text-lg px-3 my-2 py-1 rounded-md font-medium' type="number" value={payTotal} onChange={(e) => setPayTotal(e.target.value)} />
                    <button onClick={() => setPayTotal(std?.outstandingFees || 0)} className='mx-2 px-2 py-1 bg-green-600 text-white rounded-lg '>ALL</button>

                    <button onClick={() => onPaymentSubmit(std._id)} className='block px-3 py-2 font-medium bg-red-500 my-2 rounded-md text-white hover:bg-red-600'>Accept Payment</button>
                </div>

            </Model>

        </div>
    )

}




const ViewStudents = (props) => {

    const params = useParams()
    const user = useSelector(state => state.user)
    const students = useSelector(state => state.students)


    const getClassName = () => {
        return params.className.replace('_', ' ')
    }

    const className = getClassName()
    const classStudents = students[className || 'Class 1'] || []

    // model controlling
    const [modelOpen, setModelOpen] = useState(false)
    const [currentStudent, setCurrentStudent] = useState(null)
    const [result, setResult] = useState({})
    const getAge = (stdDOB) => {
        const date = new Date(stdDOB)
        const now = new Date()
        return now.getFullYear() - date.getFullYear()
    }


    const onTakeFee = (std) => {
        setCurrentStudent(std)
        setModelOpen(true)
    }

    return (
        <div className='grid m-2 space-y-2 lg:space-y-0 lg:grid-cols-2'>

            {
                classStudents?.length > 0 ?
                    classStudents?.map(std => (
                        <div className='border rounded-md py-3' >
                            <DetailItem label='Name' value={std.name} />

                            {
                                user.type !== 'Student' &&
                                <>
                                    <DetailItem label='Email' value={std.email} />
                                    <DetailItem label='Age' value={getAge(std.dateOfBirth)} />
                                    < DetailItem label='Monthly Fee' value={std.fees || 0} />
                                    <DetailItem label='Pending Fee' value={std.outstandingFees} />

                                    {
                                        user.type === 'Admin' &&


                                        <button onClick={() => onTakeFee(std)} className='m-4 py-2 px-3 bg-red-500 text-white font-medium rounded-md transition-all duration-300 hover:bg-red-600 hover:scale-95'>
                                            Take Fees
                                        </button>

                                    }
                                </>
                            }

                        </div>
                    )) :

                    <div className='col-span-3 text-center mt-10'>
                        <h3 className='text-3xl text-slate-700'>No Student is in {className}</h3>
                    </div>
            }

            {
                modelOpen &&
                <ModelOfFees result={result} setResult={setResult} setIsOpen={setModelOpen} std={currentStudent} />
            }

            <ControllModel result={result} setResult={setResult} />

        </div >
    )
}

export default ViewStudents
