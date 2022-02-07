import { useSelector } from 'react-redux'

import ViewTransition from '../../../components/ViewTransition'

const ViewAccounts = () => {

    const user = useSelector(state => state.user)

    return (
        <div className=''>

            <div className='h-72 border-[1px] border-gray-200 m-2 rounded-lg shawow-lg text-3xl text-gray-600 flex flex-col items-center justify-center'>
                {
                    user.type === 'Student' &&
                    <>
                        <div className='flex items-center justify-evenly my-3'>
                            <h4 className='px-4'>Your monthly Fees</h4>
                            <h4 className='px-4'>{user.fees}TK</h4>
                        </div>

                        <div className='w-[90%] h-[1px] bg-gray-400'></div>

                        <div className='flex items-center justify-evenly my-3'>
                            <h4 className='px-4'>Your Pending Fees</h4>
                            <h4 className='px-4'>{user.outstandingFees}TK</h4>
                        </div>
                    </>
                }

                {
                    user.type !== 'Student' &&
                    <>
                        <div className='flex items-center justify-evenly my-3'>
                            <h4 className='px-4'>Your monthly Salary</h4>
                            <h4 className='px-4'>{user.salary}TK</h4>
                        </div>

                        <div className='w-[90%] h-[1px] bg-gray-400'></div>

                        <div className='flex items-center justify-evenly my-3'>
                            <h4 className='px-4'>Your Pending Salary</h4>
                            <h4 className='px-4'>{user.pendingSalary} TK</h4>
                        </div>
                    </>
                }

            </div>

            <div className='m-4'>

                <h1 className='text-3xl text-gray-800'>Transitions</h1>

                {
                    user?.transitions?.slice(0, 10)?.map(t => (
                        <ViewTransition key={t} id={t} />
                    ))
                }

            </div>

        </div>
    )
}




export default ViewAccounts
