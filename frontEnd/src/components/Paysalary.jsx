import { useState } from 'react'
import DetailItem from './DetailItem'
import Model from './Model'

const PaySalary = ({ currentUser, setCurrentUser, heading, paySalary }) => {


    const [amount, setAmount] = useState(currentUser.salary)

    const clickAway = () => {
        setCurrentUser(null)
    }

    const onPaySalary = () => {
        paySalary(currentUser._id, amount)
    }


    return (
        <Model clickAway={clickAway}>

            <h3 className='text-center my-4 font-medium text-2xl text-red-500'>{heading}</h3>
            <div>
                <DetailItem label='Name' value={currentUser.name} />
                <DetailItem label='Email' value={currentUser.email} />
                <DetailItem label='Subject' value={currentUser.subject} />
                <DetailItem label='Salary' value={currentUser.salary} />
                <DetailItem label='Pending Salary' value={currentUser.pendingSalary} />
            </div>

            <div className='py-4 bg-gray-200 px-4'>
                <p className='my-2 text-gray-900 text-lg'>Payment Amount</p>
                <input className='px-3 py-1 rounded-l-full rounded-r-full text-lg' placeholder='Enter Amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button className='mx-2 bg-green-600 py-1 px-1 rounded-r-full rounded-l-full text-white font-medium' onClick={() => setAmount(currentUser.pendingSalary)}>Pay full</button>

                <button onClick={onPaySalary} className='block my-3 bg-red-500 hover:bg-red-600 hover:scale-95 text-white px-3 py-2 rounded-l-full rounded-r-full text-lg '>Pay Salary</button>
            </div>

        </Model>
    )

}

export default PaySalary