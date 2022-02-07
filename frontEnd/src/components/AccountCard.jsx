import React from 'react'

const AccountCard = (props) => {

    const handleLogin = () => {
        props.setLoginType(props.type)
    }



    return (
        <div className={`w-100% bg-gradient-to-r from-${props.colors.from} to-${props.colors.to} text-center rounded-lg overflow-hidden`}>



            <h4 className='text-white text-2xl '>{props.type}</h4>

            <div className='w-full flex items-center justify-center'>
                {props.children}
            </div>

            <button onClick={handleLogin} className={`w-full mt-4 uppercase py-2 px-4 font-semibold text-white bg-${props.colors.btn} `} >{props.method}</button>

            {
                props.method === 'login' && <button onClick={() => props.demoLogin(props.type)} className={`w-full uppercase py-2 px-4 font-semibold text-white`} >Demo Login</button>
            }
        </div>
    )
}

export default AccountCard
