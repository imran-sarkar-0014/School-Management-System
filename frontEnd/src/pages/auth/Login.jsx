import React, { useState } from 'react'
import CommonFooter from '../../components/CommonFooter'
import CommonHeader from '../../components/CommonHeader'
import AccountCard from '../../components/AccountCard'
import Model from '../../components/Model'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import ControllModel from '../../components/ControllModel'

import { login } from '../../api/expressApi'

import { useDispatch } from 'react-redux'
import { updateToken } from '../../store/actions/token'

const LoginModel = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clickAway = () => {
        props.setType('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        login(
            {
                email,
                password,
                type: props.type
            },

            // success callback
            (data) => {

                if (remember) {

                    //user login
                    localStorage.setItem('loginType', props.type)
                    localStorage.setItem('token', data)
                }
                dispatch(updateToken(props.type, data))
                navigate('/dashboard')
            },

            // failur callback
            (msg) => {

                props.setResult({ ...props.result, fail: true, msg: msg })
                props.setType('')
            }

        )


    }




    return (
        <Model clickAway={clickAway}>
            <form onSubmit={handleSubmit} action="" className='w-full h-full p-4 relative'>

                {/* Close button of model */}
                <span onClick={clickAway} className='absolute to-1 right-4 bg-gray-200 p-1 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>

                {/* login Display */}
                <h4 className='w-full text-2xl text-sky-800 font-semibold text-center py-4'>LOGIN as {props.type}</h4>

                {/* Inputs  */}
                <Input name={`${props.type} Email`} value={email} setValue={setEmail} />
                <Input name={`${props.type} PASSWORD`} value={password} setValue={setPassword} type='password' />


                {/* Checkbox */}
                <div className='flex items-center'>
                    <input checked={remember} onClick={() => setRemember(!remember)} type='checkbox' className='my-2 w-5 h-5' />
                    <p className='inline mx-2 text-lg'>remember</p>
                </div>

                {/* login button */}
                <button onClick={handleSubmit} className='px-2 py-3 bg-blue-600 text-white rounded-lg'>LOG IN</button>
                <p className='my-2 text-lg text-gray-700'>Need an Acccount? <Link to='/register' className='text-ingigo-700'>Create an Account</Link> </p>
            </form>
        </Model>
    )
}



const Login = () => {

    const [loginType, setLoginType] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    const demoLogin = (type) => {
        if (type === 'Student') {

            const t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDg3ODQ0MWUyMTA1YjI2MmM0NDJiMyIsImVtYWlsIjoic2FraWJtaWFAZ21haWwuY29tIiwidHlwZSI6IlN0dWRlbnQiLCJpYXQiOjE2NDE1Nzc0MDR9.rw_nMT_xZJXRew09rb6k_07evJFqSxZnoHPuDSYU9ao"
            localStorage.setItem('loginType', 'Student')
            localStorage.setItem('token', t)

            dispatch(updateToken("Student", t))
            navigate('/dashboard')

        } else if (type === "Teacher") {

            const t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDg3ODk4MWUyMTA1YjI2MmM0NDMyMiIsImVtYWlsIjoiamFtYWx1ZGRpbkBnbWFpbC5jb20iLCJ0eXBlIjoiVGVhY2hlciIsImlhdCI6MTY0MTU3NzQ3NH0.q4B2z8JM3eb8ql_-V-OTZe1v4yrPA2QogQPEw3PuQtA"

            localStorage.setItem('loginType', 'Teacher')
            localStorage.setItem('token', t)

            dispatch(updateToken('Teacher', t))
            navigate('/dashboard')
        } else if (type === 'Admin') {

            const t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDg3Y2JhMWUyMTA1YjI2MmM0NDRhMyIsImVtYWlsIjoic29oaWR1bGxhaEBnbWFpbC5jb20iLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE2NDE1Nzc2NzJ9.H3y6CbjONm00gu87B9EDYv4_djLvPpo4zMLBMJVvvlI"

            localStorage.setItem('loginType', 'Admin')
            localStorage.setItem('token', t)

            dispatch(updateToken('Admin', t))
            navigate('/dashboard')
        }
    }

    return (
        <div className='relative h-screen'>
            <CommonHeader colored={true} />

            {
                // model will be show when login Type (loginType) not null
                loginType !== '' && <LoginModel result={result} setResult={setResult} type={loginType} setType={setLoginType} />
            }

            <ControllModel result={result} setResult={setResult} />

            <div className='min-h-[60%] py-12 bg-gradient-to-b from-white to-indigo-300'>

                <h2 className='text-3xl text-center my-4 font-medium text-gray-700'>Login Your Account</h2>
                <div className='flex-1  max-w-[70%] h-full my-auto mx-auto grid space-y-4 md:space-y-0 space-x-0 md:space-x-2 md:grid-cols-3 '>

                    {/* Account Card for Student */}
                    <AccountCard
                        type='Student'
                        method='login'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'cyan-500',
                            to: 'cyan-600',
                            btn: 'cyan-800'
                        }}
                        demoLogin={demoLogin}
                    >
                        {/* Icon for Card */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </AccountCard>


                    {/* Account Card for Teacher */}
                    <AccountCard
                        type='Teacher'
                        method='login'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'teal-500',
                            to: 'emerald-500',
                            btn: 'emerald-800'
                        }}
                        demoLogin={demoLogin}
                    >
                        {/* Icon for card */}
                        <img className='h-24 w-24 text-white' src="/images/teacher.svg" alt="" />
                    </AccountCard>

                    {/* Account Card for Admin  */}
                    <AccountCard
                        type='Admin'
                        method='login'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'rose-500',
                            to: 'pink-500',
                            btn: 'pink-800'
                        }}
                        demoLogin={demoLogin}
                    >
                        <img className='h-24 w-24' src="/images/admin.jpg" alt="" />
                    </AccountCard>
                </div>
            </div>
            <CommonFooter />
        </div>
    )
}

export default Login