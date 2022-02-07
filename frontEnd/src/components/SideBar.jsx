import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {

    const handleClick = () => {
        props.setOpen(false)
    }

    return (
        <li onClick={handleClick} className='w-full flex flex-col group'>

            <Link to={props.link} className='flex  items-center w-full pl-[20%] space-x-4  py-2 hover:bg-gray-600 group'>

                {props.children}
                <p className={props.open ? 'inline' : 'hidden'} >{props.text}</p>

            </Link>
            <div className='transition-all duration-500 w-0 group-hover:w-[75%] h-[2px] mx-auto bg-slate-100'></div>
        </li>

    )

}

const SideBar = (props) => {

    const [open, setOpen] = useState(false)


    const { type = null } = props.user



    const toggleHandler = () => {
        setOpen(!open)
    }



    return (
        <div className={`h-full  ${props.wMin ? 'absolute' : ''} bg-gray-700 z-10 text-gray-100 flex flex-col transition-all duration-300 ${open ? 'w-72' : 'w-16'} `}>


            <button onClick={toggleHandler} className=' bg-gray-600 w-fit mr-3 ml-auto p-1 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>


            {/* profile */}
            <div className=''>
                <div className={`rounded-full mx-auto bg-white overflow-hidden transition-all duration-200 ${open ? 'h-36 w-36' : 'h-12 w-12 mt-4'}`}>
                    <img src="/images/avatar.png" alt="" />
                </div>
                <h4 className={` transition-all duration-200 text-center my-4 text-2xl  ${open ? 'block' : 'hidden'}`}>{props.user?.name}</h4>
                <p className={`${open ? '' : 'hidden'} text-gray-400 text-center -mt-4`}>You are a {props.user.type}</p>
            </div>

            <div className='w-[85%] my-4 mx-auto h-[1px] bg-white'></div>


            {/* Links of side bar */}
            <ul className='flex-1 overflow-y-scroll flex flex-col items-center space-y-8'>

                <ListItem link='/dashboard' open={open} setOpen={setOpen} text="Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </ListItem>

                <ListItem link="/dashboard/accounts" open={open} setOpen={setOpen} text="Fees and Salaries">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </ListItem>

                <ListItem link='/dashboard/attendance' open={open} setOpen={setOpen} text="Attendance">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </ListItem>


                <ListItem link="/dashboard/notice" open={open} setOpen={setOpen} text="Notices">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </ListItem>

                {
                    type === 'Student' ?
                        <ListItem link={`/dashboard/students/${props.user.currentClass.replace(' ', '_')}`} open={open} setOpen={setOpen} text='Students'>
                            <img className='h-6 w-6 md:h-8 md:w-8 invert' src="/images/students.jpg" alt="" />
                        </ListItem>
                        :
                        <ListItem link='/dashboard/classes' open={open} setOpen={setOpen} text='Students'>
                            <img className='h-6 w-6 md:h-8 md:w-8 invert' src="/images/students.jpg" alt="" />
                        </ListItem>
                }


                <ListItem link='/dashboard/teachers' open={open} setOpen={setOpen} text='Teachers'>
                    <img className='h-6 w-6 md:h-8 md:w-8 invert' src="/images/teacher.png" alt="" />
                </ListItem>

                <ListItem link='/dashboard/admins' open={open} setOpen={setOpen} text='Admins'>
                    <img className='h-6 w-6 md:h-8 md:w-8 grayscale' src="/images/admin.png" alt="" />
                </ListItem>


                {
                    type === 'Admin' && (
                        <>

                            <ListItem link='/dashboard/admission' open={open} setOpen={setOpen} text='Admission'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            </ListItem>

                            <ListItem link='/dashboard/registrations' open={open} setOpen={setOpen} text="Registrations">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </ListItem>

                            <ListItem link='/dashboard/fund' open={open} setOpen={setOpen} text="School Fund">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </ListItem>
                        </>)
                }






                <ListItem link='/dashboard/profile' open={open} setOpen={setOpen} text='Profile'>
                    <img className='h-8 w-8 grayscale' src="/images/avatar.png" alt="" />
                </ListItem>

                <li className=''>
                    <div className='h-[100px]'></div>
                </li>

            </ul>


        </div >
    )
}

export default SideBar
