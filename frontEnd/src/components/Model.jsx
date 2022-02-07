import React from 'react'

const Model = (props) => {

    const clickAwayHandler = () => {
        props.clickAway()
    }

    const clickInside = () => {
    }


    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-gray-600 bg-opacity-30 z-30'>
            <div className='h-full w-full relative'>
                <div className='absolute h-full w-full flex items-center justify-center'>
                    <div onClick={clickInside} className='z-50 bg-white min-w-[260px] w-[80%] max-w-[760px] min-h-[460px] rounded-lg overflow-hidden shadow-lg'>
                        {props.children}
                    </div>
                </div>
                <div onClick={clickAwayHandler} className='absolute w-full h-full'></div>
            </div>
        </div>
    )
}

export default Model
