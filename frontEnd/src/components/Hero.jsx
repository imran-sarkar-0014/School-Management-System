import React from 'react'

const Hero = (props) => {

    const { image } = props

    return (
        <div className='relative h-full w-full flex items-center justify-center z-10' >
            <img className='absolute z-0 h-full w-full object-cover opacity-60' src={image} alt="" />
            <div className='z-20 max-w-[900px] px-8'>
                {props.children}
            </div>
        </div >
    )
}

export default Hero
