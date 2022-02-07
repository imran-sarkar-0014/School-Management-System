import React from 'react'

const HomeDecoration = (props) => {
    return (
        <div data-aos={props.dataAos} className='mt-2 mb-4'>
            <img className='w-full h-52 aspect-auto object-cover' src={props.image} alt="" />
            <h4 className='text-2xl text-teal-600 font-semibold py-2' >{props.header}</h4>
            <p className='text-lg text-gray-700'>{props.text}</p>
        </div>
    )
}

export default HomeDecoration
