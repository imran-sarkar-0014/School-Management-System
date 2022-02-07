import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Classes = (props) => {
    return (
        <Link to={`/dashboard/students/${props.name.replace(' ', '_')}`} className='border rounded-lg m-2 h-32 flex flex-col items-center justify-center'>
            <h2 className='text-xl'>
                {props.name}
            </h2>
            <p className='block'>Total Student {props.students.length}</p>
        </Link>
    )
}

const ViewClasses = () => {

    const students = useSelector(state => state.students)

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3'>
            {
                Object.keys(students).map(name => (
                    <Classes key={name} name={name} students={students[name]} />
                ))
            }
        </div>
    )
}


export default ViewClasses
