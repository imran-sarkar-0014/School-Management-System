import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NavLink = (props) => {
    return (
        <li className='text-white bg-slate-600 transition-all duration-200 hover:bg-slate-700 p-0 md:px-4 md:py-2 md:rounded-md w-full '>
            <Link to={props.to} className='my-2 py-2 w-full'>
                <span className='text-center' >{props.text}</span>
            </Link>
        </li>
    )
}

const MenuLink = (props) => {
    return (
        <Link to={props.to} className='w-full text-center bg-gray-600 transition-all duration-200 hover:bg-gray-500 my-2 py-2 text-gray-200 font-medium uppercase'>
            <span>{props.text}</span>
        </Link>

    )
}

const CommonHeader = (props) => {


    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {

        const resideHandler = (e) => {
            if (window.innerWidth > 768) {
                setMenuOpen(false)
            }
        }

        window.addEventListener('resize', resideHandler)

        return () => {
            window.removeEventListener('resize', resideHandler)
        }
    }, [])


    return (
        <div className={`${props.absolute && 'absolute'} top-0 left-0 w-full h-auto z-30 bg-transparent`}>

            <div className='m-4 flex items-center justify-between'>
                <p className='text-4xl uppercase text-slate-800 font-semibold tracking-wide'>Education</p>

                <ul className='hidden md:flex space-x-2'>
                    <NavLink to='/' text='Home' />
                    <NavLink to='/dashboard' text='Dashboard' />
                    <NavLink to='/services' text='Services' />
                    <NavLink to='/login' text='Login' />
                    <NavLink to='/register' text='Register' />
                </ul>

                {/* menu */}

                <button onClick={handleMenu} className='md:hidden p-1 hover:bg-gray-700 rounded-lg bg-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>


                <div className={`fixed top-0 right-0 md:hidden h-screen overflow-hidden transition-all duration-300 ${menuOpen ? 'w-72' : 'w-0'} `}>

                    <div className='flex flex-col  bg-gray-700 w-full h-full'>
                        <button onClick={handleMenu} className='md:hidden p-1 hover:bg-gray-700 rounded-lg bg-gray-600 w-fit m-4 ml-auto'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <ul className='flex flex-col p-0 justify-center items-center'>
                            <MenuLink to='/' text='Home' />
                            <MenuLink to='/dashboard' text='Dashboard' />
                            <MenuLink to='/services' text='Services' />
                            <MenuLink to='/login' text='Login' />
                            <MenuLink to='/register' text='Register' />
                        </ul>

                    </div>



                </div>

            </div>
        </div >
    )
}

export default CommonHeader
