import React, { useState, useEffect } from 'react'
import CommonFooter from '../../components/CommonFooter'
import CommonHeader from '../../components/CommonHeader'
import AccountCard from '../../components/AccountCard'
import Model from '../../components/Model'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import ControllModel from '../../components/ControllModel'

// import api's
import { registration } from '../../api/expressApi'


// options

import classes from './data/classes.json'
import subjects from './data/subjects.json'
import adminRole from './data/adminRole.json'


const SelectInput = (props) => {

    return (
        <select onChange={(e) => props.onChange(e.target.value)} className='w-1/2 border border-gray-400 rounded-md focus:outline-none text-center text-lg uppercase ' >
            {props.children}
        </select >
    )
}

const Option = (props) => {
    const { children } = props
    return (
        <option className='uppercase' > {children}</option >
    )
}

const RegisterModel = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Male')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(Date.now())
    const [classLevel, setClassLevel] = useState('')

    const clickAway = () => {
        props.setType('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        registration(
            {
                name,
                dateOfBirth,
                gender,
                email,
                password,
                classLevel,
                type: props.type,
            },

            // Success Callback
            (data) => {
                props.setResult({ ...props.result, success: true, msg: "Account Placed for Confirmation." })
                props.setType('')
            },
            // failur callback
            (msg) => {

                props.setResult({ ...props.result, fail: true, msg: msg })
                props.setType('')
            }
        )

    }

    useEffect(() => {

        if (props.type === 'Student') {
            setClassLevel(classes[0])
        } else if (props.type === 'Teacher') {
            setClassLevel(subjects[0])
        } else if (props.type === 'Admin') {
            setClassLevel(adminRole[0])
        }

    }, [props.type])



    const renderClassLevel = () => {

        switch (props.type) {
            case 'Student':
                return <SelectInput onChange={(v) => setClassLevel(v)} value={classLevel} >
                    {
                        classes.map(c => (
                            <Option key={c} value={c}>{c}</Option>
                        ))
                    }
                </SelectInput>

            case 'Teacher':
                return <SelectInput onChange={(v) => setClassLevel(v)} value={classLevel}>
                    {
                        subjects.map(s => (
                            <Option key={s} value={s}>{s}</Option>
                        ))
                    }
                </SelectInput>

            case 'Admin':
                return <SelectInput onChange={(v) => setClassLevel(v)} value={classLevel}>
                    {
                        adminRole.map(a => (
                            <Option key={a} value={a}>{a}</Option>
                        ))
                    }
                </SelectInput>
            default: return null
        }


    }

    const genderChangeHandler = (gen) => {
        setGender(gen)
    }

    return (
        <Model clickAway={clickAway}>
            <form onSubmit={handleSubmit} action="" className='w-full h-full p-4 relative'>

                {/* model close button */}
                <span onClick={clickAway} className='absolute to-1 right-4 bg-gray-200 p-1 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>

                {/* register display */}
                <h4 className='w-full text-2xl text-sky-800 font-semibold text-center py-4'>REGISTER as {props.type}</h4>

                {/* inputs */}
                <Input name={`${props.type}'s name`} value={name} setValue={setName} />
                <Input name={`${props.type}'s Date of Birth`} value={dateOfBirth} setValue={setDateOfBirth} type='date' />
                <Input name={`${props.type}'s email`} value={email} setValue={setEmail} type='email' />
                <Input name={`${props.type}'s PASSWORD`} value={password} setValue={setPassword} type='password' />

                {/* Gender box */}
                <h3>Gender</h3>
                <div className='flex my-4 space-x-2'>

                    <div className='flex items-center space-x-1 '>
                        <input name='gender' onClick={() => genderChangeHandler('Male')} value={gender} type="radio" />
                        <p className='text-md font-normal text-gray-700'>Male</p>
                    </div>
                    <div className='flex items-center space-x-1 '>
                        <input name='gender' onClick={() => genderChangeHandler('Female')} value={gender} type="radio" />
                        <p className='text-md font-normal text-gray-700'>Female</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <input name='gender' onClick={() => genderChangeHandler("don't want to disclosed")} value={gender} type="radio" />
                        <p p className='text-md font-normal text-gray-700' > don't want to disclosed</p>
                    </div>


                </div>


                {
                    renderClassLevel()
                }

                {/* Checkbox */}
                {/* <div className='flex items-center'>
                    <input checked={remember} onClick={() => setRemember(!remember)} type='checkbox' className='my-2 w-5 h-5' />
                    <p className='inline mx-2 text-lg'>remember</p>
                </div> */}


                {/* Register Button */}
                <button onClick={handleSubmit} className='block my-4 px-2 py-3 bg-blue-600 text-white rounded-lg uppercase'>register</button>
                <p className='my-2 text-lg text-gray-700'>Already a {props.type}? <Link to='/login' className='text-ingigo-700'>Login</Link> </p>
            </form>
        </Model>
    )
}

















const Register = () => {

    const [loginType, setLoginType] = useState('')

    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    return (
        <div className='relative h-screen'>

            {/* import colors for use */}
            <div className='hidden from-cyan-500 to-cyan-600 bg-cyan-800 from-teal-500 to-emerald-500 bg-emerald-800 from-rose-500 to-pink-500 bg-pink-800'></div>

            <CommonHeader colored={true} />

            {
                loginType !== '' && <RegisterModel result={result} setResult={setResult} type={loginType} setType={setLoginType} />
            }


            <ControllModel result={result} setResult={setResult} />


            <div className='min-h-[60%] py-12 bg-gradient-to-b from-white to-indigo-300'>

                <h2 className='text-3xl text-center my-4 font-medium text-gray-700'>Register Your Account</h2>

                {/* Account card grid's parent element */}
                <div className='flex-1  max-w-[70%] h-full my-auto mx-auto grid space-y-4 md:space-y-0 space-x-0 md:space-x-2 md:grid-cols-3 '>

                    {/* Account Card for Student */}
                    <AccountCard
                        type='Student'
                        method='register'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'cyan-500',
                            to: 'cyan-600',
                            btn: 'cyan-800'
                        }}
                    >
                        {/* Icon for Card */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </AccountCard>


                    {/* Account Card for Teacher */}
                    <AccountCard
                        type='Teacher'
                        method='register'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'teal-500',
                            to: 'emerald-500',
                            btn: 'emerald-800'
                        }}
                    >
                        {/* Icon for card */}
                        <img className='h-24 w-24 text-white' src="/images/teacher.svg" alt="" />
                    </AccountCard>

                    {/* Account Card for Admin  */}
                    <AccountCard
                        type='Admin'
                        method='register'
                        setLoginType={setLoginType}
                        colors={{
                            from: 'rose-500',
                            to: 'pink-500',
                            btn: 'pink-800'
                        }} >
                        <img className='h-24 w-24' src="/images/admin.jpg" alt="" />
                    </AccountCard>
                </div>
            </div>
            <CommonFooter />
        </div>
    )
}

export default Register