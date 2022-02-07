import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Model from '../../../components/Model'
import ControllModel from '../../../components/ControllModel'

import { updateFund, updateMonth } from '../../../api/expressApi'
import { setFund } from '../../../store/actions/fund'
import { useDispatch } from 'react-redux'

const Fund = () => {

    const fund = useSelector(state => state.fund)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    const onUpdateMonth = () => {
        updateMonth((succ) => {

            dispatch(setFund(succ.fund))

            setResult({
                success: true,
                msg: succ.msg
            })
        },
            (err) => {
                setResult({
                    fail: true,
                    msg: err
                })
            })
    }

    const onEdit = () => {
        setOpen(true)
    }

    return (
        <div className=''>

            <div className='p-4 flex'>
                <button onClick={onUpdateMonth} className="py-3 px-4 rounded-r-full rounded-l-full text-white text-lg ml-auto bg-red-500">
                    Update Month
                </button>
            </div>

            <div className='m-4 p-4 border rounded-lg'>
                <table className='w-full' border="1px">

                    <thead>
                        <tr className='py-3 border-b'>
                            <th className='text-left'>Description</th>
                            <th className='text-left'>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <TD text="Total amount" />
                            <TD text={fund.total + ' TK'} />
                        </tr>
                        <tr>
                            <TD text="Total pending fees" />
                            <TD text={fund.totalPendingFees + ' TK'} />
                        </tr>
                        <tr>
                            <TD text="Total pending salary" />
                            <TD text={fund.totalPendingSalaries + ' TK'} />
                        </tr>
                    </tbody>
                </table>
            </div>

            <button onClick={onEdit} className='flex items-center text-lg bg-blue-500 mx-4 px-4 py-2 text-white rounded-l-full rounded-r-full hover:bg-blue-700 hover:scale-90'>
                <p className='px-2'>Edit</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>

            {
                open &&
                <FundModel fund={fund} setOpen={setOpen} setResult={setResult} />
            }

            <ControllModel result={result} setResult={setResult} />

        </div>
    )
}

const TD = ({ text }) => {
    return (
        <td className='text-lg font-medium'>{text}</td>
    )
}

const FundModel = ({ setOpen, fund, setResult }) => {

    const clickWay = () => {
        setOpen(false)
    }

    const dispatch = useDispatch()

    const [total, setTotal] = useState(fund?.total)
    const [pendingFees, setPendingFees] = useState(fund?.totalPendingFees)
    const [pendingSalaries, setPendingSalaries] = useState(fund?.totalPendingSalaries)


    const onSubmit = (e) => {
        e.preventDefault()

        updateFund({
            total: total,
            totalPendingFees: pendingFees,
            totalPendingSalaries: pendingSalaries
        },
            (f) => {
                dispatch(setFund(f))
                setResult({
                    success: true,
                    msg: "Successfully updated."
                })
            },
            (err) => {
                setResult({
                    fail: true,
                    msg: err
                })
            }
        )

        setOpen(false)

    }

    return (
        <Model clickAway={clickWay}>
            <form onSubmit={onSubmit} className='px-8'>
                <h3 className='text-3xl text-center my-12'>Update Values</h3>

                <table className='w-full'>

                    <thead>
                        <tr className='py-3 border-b'>
                            <th className='text-left'>Description</th>
                            <th className='text-left'>Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr className='border-b-[2px] border-x-gray-500'>
                            <td>
                                <h2 className='text-lg font-medium'>Total Amount</h2>
                            </td>
                            <td>
                                <input className='border rounded-lg px-3 py-2 text-lg ' type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
                            </td>
                        </tr>

                        <tr className='border-b-[2px] border-x-gray-500'>
                            <td>
                                <h2 className='text-lg font-medium'>Total pending Fees</h2>
                            </td>
                            <td>
                                <input className='border rounded-lg px-3 py-2 text-lg ' type="number" value={pendingFees} onChange={(e) => setPendingFees(e.target.value)} />
                            </td>
                        </tr>

                        <tr className='border-b-[2px] border-x-gray-500'>
                            <td>
                                <h2 className='text-lg font-medium'>Total pending salaries</h2>
                            </td>
                            <td>
                                <input className='border rounded-lg px-3 py-2 text-lg ' type="number" value={pendingSalaries} onChange={(e) => setPendingSalaries(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className='m-4 px-4 py-2 rounded-l-full rounded-r-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-90'>
                    Update
                </button>

            </form>
        </Model>
    )
}

export default Fund
