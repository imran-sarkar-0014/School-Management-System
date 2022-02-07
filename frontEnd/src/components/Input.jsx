import React from 'react'

const Input = (props) => {

    const { name, value, setValue, type = 'text' } = props


    return (
        <div className='my-3'>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 uppercase'>{name}</label>
            <div className='mt-1'>
                <input type={type} name={name} value={value} onChange={(e) => setValue(e.target.value)} required={true} className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500' />
            </div>
        </div>
    )
}

export default Input
