import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { updateToken } from '../store/actions/token'

const DashboardHeader = (props) => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        localStorage.setItem('loginType', '')
        localStorage.setItem('token', '')
        dispatch(updateToken('', ''))
    }


    return (
        <div className=' bg-gray-700 py-2 w-screen flex items-center justify-between px-4'>
            <Link to='/dashboard' className='text-gray-100 font-medium text-sm sm:text-lg  md:text-3xl py-3 uppercase px-2'>School Management</Link>

            <div onClick={logoutHandler} className='flex items-center space-x-2 bg-gray-300 hover:bg-gray-200 group px-2 py-1 rounded-l-full rounded-r-full cursor-pointer '>
                <div className='bg-gray-100 rounded-3xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' viewBox="0 0 48 48"><path d="M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 20c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z" /><path fill="none" d="M0 0h48v48h-48z" /></svg>
                </div>
                <span className='text-sm font-medium text-gray-700 group-hover:text-red-600 group-hover:scale-105'>LOG OUT</span>
            </div>
        </div>
    )
}

export default DashboardHeader
