import AdmissionViewCard from '../../../components/AdmissionViewCard'

import { useSelector, useDispatch } from 'react-redux'
import { setPendingStudents } from '../../../store/actions/pending'
import { addStudent } from '../../../store/actions/users'

import { deleteAdmission, acceptRegistration } from '../../../api/expressApi'


const Admissions = () => {

    const dispatch = useDispatch()
    const pendingStudents = useSelector(state => state.pendingStudents)
    const students = useSelector(state => state.students)

    const handleStudentAdmission = (id, value) => {

        acceptRegistration({
            id, value
        }, (data) => {
            // Remove the admission from array
            dispatch(setPendingStudents(pendingStudents.filter(std => std._id !== id)))

            dispatch(addStudent(data))
        })
    }

    const handleStudentRejection = (id) => {
        deleteAdmission(id, (data) => {
            if (id === data._id) {
                // Remove the admission from array
                dispatch(setPendingStudents(pendingStudents.filter(std => std._id !== id)))
            }
        })
    }


    return (
        <div className='grid md:space-x-2 md:grid-cols-1 lg:grid-cols-3'>
            {
                pendingStudents.map(stud => (
                    <AdmissionViewCard key={stud._id} details={stud} type="Student" handleAdmit={handleStudentAdmission} handleReject={handleStudentRejection} />
                ))
            }

            {
                pendingStudents.length === 0 &&
                <div className="text-center my-8 text-2xl text-gray-700 col-span-full">
                    Admission Empty
                </div>
            }
        </div>
    )
}




export default Admissions
