import DetailItem from "./DetailItem"
import { useSelector } from "react-redux"

const CardView = ({ details, type = "Student", setCurrentUser }) => {

    const date = new Date(details?.dateOfBirth)
    const now = new Date()
    const user = useSelector(state => state.user)

    const getAge = () => {
        return now.getFullYear() - date.getFullYear()
    }

    const handlePayment = () => {
        setCurrentUser(details)
    }

    return (
        <div className='border rounded-md py-3' >

            <DetailItem label='Name' value={details?.name} />
            <DetailItem label="Email" value={details?.email} />
            {
                user.type === 'Admin' &&
                <DetailItem label='Age' value={getAge()} />
            }

            {type === 'Admin' && <DetailItem label='Position' value={details.position} />}
            {type === 'Teacher' && <DetailItem label='Subject' value={details.subject} />}

            {
                user.type === 'Admin' && type === 'Admin'
                && <DetailItem label="Salary" value={details?.salary} />
            }

            {
                user.type === 'Admin' &&
                <>
                    <DetailItem label='Pending Salary' value={details.pendingSalary} />
                    <div className="m-3 ">
                        <button onClick={handlePayment} className="px-3 py-2 rounded-l-full rounded-r-full bg-red-500 text-white font-medium hover:bg-red-600">Pay salary</button>
                    </div>
                </>
            }

        </div>
    )
}

export default CardView