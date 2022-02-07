import React from 'react'

import { useSelector } from 'react-redux'

import ViewTransition from '../../../components/ViewTransition'

const Profile = () => {

    const user = useSelector(state => state.user)

    const date = new Date(user.dateOfBirth)

    return (
        <div className=''>

            <div className='m-2 text-md md:text-xl xl:text-2xl py-12 border border-zinc-300 shadow-lg p-2 rounded-lg '>

                <div className='flex items-center text-gray-600 py-2'>
                    <h2 className=' px-4 w-28 md:w-48'>Name </h2>
                    <h2 className=' px-4'>{user?.name}</h2>
                </div>

                <div className='flex items-center text-gray-600 py-2'>
                    <h2 className=' px-4 w-28 md:w-48'>Email </h2>
                    <h2 className=' px-4'>{user?.email}</h2>
                </div>

                <div className='flex items-center text-gray-600 py-2'>
                    <h2 className=' px-4 w-28 md:w-48'>Gender </h2>
                    <h2 className=' px-4'>{user?.gender}</h2>
                </div>

                {
                    user.type == 'Student' &&
                    <>
                        <div className='flex items-center text-gray-600 py-2'>
                            <h2 className=' px-4 w-28 md:w-48'>Class</h2>
                            <h2 className=' px-4'>{user?.currentClass}</h2>
                        </div>
                        <div className='flex items-center text-gray-600 py-2'>
                            <h2 className=' px-4 w-28 md:w-48'>Monthly Fees </h2>
                            <h2 className=' px-4'>{user?.fees}TK</h2>
                        </div>


                        <div className='flex items-center text-gray-600 py-2'>
                            <h2 className=' px-4 w-28 md:w-48'>Pending Fees</h2>
                            <h2 className=' px-4'>{user?.outstandingFees}TK</h2>
                        </div>
                    </>
                }

                <div className='flex items-center text-gray-600 py-2'>
                    <h2 className=' px-4 w-28 md:w-48'>Date of Birth</h2>
                    <h2 className=' px-4'>{`${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`}</h2>
                </div>
            </div>

            <div className='m-4'>

                <h4 className='text-3xl text-gray-600'>Transitions</h4>

                {
                    user?.transitions?.slice(0, 5)?.map(trans => (
                        <ViewTransition key={trans} id={trans} />
                    ))
                }

            </div>

        </div>
    )
}

export default Profile
