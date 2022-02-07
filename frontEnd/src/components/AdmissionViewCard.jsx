import { useState, useEffect } from 'react'

import studentFee from './studentsFee.json'
import teachersSalary from './teachersSalary.json'
import adminsSalary from './adminsSalary.json'

import DetailItem from './DetailItem'


const AdmissionViewCard = ({ details, handleAdmit, handleReject, type = 'Student' }) => {

    const dob = new Date(details.dateOfBirth)
    const [amount, setAmount] = useState('')


    useEffect(() => {

        if (details.type === 'Student')
            setAmount(studentFee[details.classLevel])

        if (details.type === 'Teacher')
            setAmount(teachersSalary[details.classLevel])

        if (details.type === 'Admin')
            setAmount(adminsSalary[details.classLevel])

    }, [])

    return (
        <div className='my-4 border rounded-lg p-3'>
            <DetailItem label='ID' value={details._id} />
            <DetailItem label='NAME' value={details.name} />
            <DetailItem label='EMAIL' value={details.email} />
            <DetailItem label='GENDER' value={details.gender} />
            <DetailItem label='DATE OF BIRTH' value={`${dob.getDay()}/${dob.getMonth() + 1}/${dob.getFullYear()}`} />

            {/* For Student */}
            {
                type === 'Student' &&
                <DetailItem label='Admission for' value={details.classLevel} />
            }
            {/* For Teacher */}
            {
                type === 'Teacher' &&
                <DetailItem label='Admission for' value={details.classLevel} />
            }

            {/* For Teacher */}
            {
                type === 'Admin' &&
                <DetailItem label='Admission for' value={details.classLevel} />
            }

            <div className='px-2 text-lg my-2'>
                <h2 className='w-32'>{type === 'Student' ? 'Monthly Fees' : "Monthly Salary"} :</h2>
                <input placeholder='Amount' className='border rounded-md' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className='flex'>
                <button
                    onClick={() => handleAdmit(details._id, amount)}
                    className="bg-purple-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-purple-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
                    ADMIT
                </button>
                <button
                    onClick={() => handleReject(details._id)}
                    className="bg-red-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
                    REJECT
                </button>
            </div>
        </div >
    )
}


export default AdmissionViewCard