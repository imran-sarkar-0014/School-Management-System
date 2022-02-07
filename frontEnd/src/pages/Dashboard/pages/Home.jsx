import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({ link, text, children }) => {
    return (
        <div className=' mx-3 my-2 rounded-xl border shadow-md'>
            <Link to={link} className='flex md:flex-col md:py-2 items-center justify-evenly'>
                <div className='opacity-80 w-24'>
                    {children}
                </div>
                <h3 className='text-lg md:text-xl'>{text}</h3>
            </Link>
        </div>
    )
}

const Home = () => {

    const user = useSelector(state => state.user)

    return (
        <div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>

                <Card link="/dashboard/accounts" text="Fees and Salaries">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </Card>

                <Card link='/dashboard/attendance' text="Attendance">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Card>


                <Card link="/dashboard/notice" text="Notices">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </Card>

                {
                    user.type === 'Student' ?
                        <Card link={`/dashboard/students/${user.currentClass.replace(' ', '_')}`} text='Students'>
                            <img className='h-full w-full md:h-full md:w-full grayscale' src="/images/students.jpg" alt="" />
                        </Card>
                        :
                        <Card link='/dashboard/classes' text='Students'>
                            <img className='h-full w-full md:h-full md:w-full grayscale' src="/images/students.jpg" alt="" />
                        </Card>
                }


                <Card link='/dashboard/teachers' text='Teachers'>
                    <img className='h-full w-full md:h-full md:w-full grayscale' src="/images/teacher.png" alt="" />
                </Card>

                <Card link='/dashboard/admins' text='Admins'>
                    <img className='h-full w-full md:h-full md:w-full grayscale' src="/images/admin.png" alt="" />
                </Card>


                {
                    user.type === 'Admin' && (
                        <>

                            <Card link='/dashboard/admission' text='Admission'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            </Card>

                            <Card link='/dashboard/registrations' text="Registrations">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </Card>


                            <Card link='/dashboard/fund' text="School Fund">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full md:h-full md:w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </Card>

                        </>)
                }


                <Card link='/dashboard/profile' text='Profile'>
                    <img className='h-full w-full md:h-full md:w-full grayscale' src="/images/avatar.png" alt="" />
                </Card>
            </div>
        </div>
    )
}

export default Home
