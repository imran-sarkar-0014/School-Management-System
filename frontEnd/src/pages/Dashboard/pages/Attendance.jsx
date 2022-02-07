import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { updateAttendance, postAttendance, deleteAttendance } from '../../../api/expressApi';
import { addAttendance, updateAttendance as editAttendance, deleteAttendance as removeAttendance } from '../../../store/actions/attendance';
import Model from '../../../components/Model'
import ControllModel from '../../../components/ControllModel'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


const Attendance = () => {

    const attendance = useSelector(state => state.attendance)
    const [openModel, setOpenModel] = useState(false)
    const [currentClass, setCurrentClass] = useState('')
    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    return (
        <div className='overflow-y-scroll'>

            <Accordion>

                {
                    Object.keys(attendance).map((k, i) => {
                        return (
                            <FoldAttend key={i} label={k} attends={attendance[k]} setOpenModel={setOpenModel} setCurrentClass={setCurrentClass} result={result} setResult={setResult} />
                        )
                    })
                }
            </Accordion>

            {
                openModel && <AttendModel currentClass={currentClass} setCurrentClass={setCurrentClass} setOpenModel={setOpenModel} setResult={setResult} />
            }

            <ControllModel result={result} setResult={setResult} />

            <div className='w-full h-56 bg-transprent'></div>

        </div>
    )
}

/// model

const AttendModel = ({ setOpenModel, currentClass, setCurrentClass, setResult }) => {

    const onCancle = () => {
        setOpenModel(false)
        setCurrentClass('')
    }

    const students = useSelector(state => state.students)

    const [attendances, setAttendances] = useState([])
    const [date, setDate] = useState('')
    const dispatch = useDispatch()
    const _class = students[currentClass]


    useEffect(() => {

        let attend = []
        _class.forEach(stud => {
            attend = [...attend, { name: stud.name, id: stud._id, present: false }]
        })
        setAttendances(attend)

        const d = new Date()
        setDate(`${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`)

    }, [])

    const onEdit = (st) => {
        setAttendances(attendances.filter(stud => {
            if (stud.id == st.id) {
                stud.present = !stud.present
                return stud
            } else
                return stud
        }))
    }

    const onSubmit = () => {
        postAttendance({
            className: currentClass,
            date: date,
            attendances: attendances
        },
            // callback
            (_attend) => {
                dispatch(addAttendance(currentClass, _attend))
                onCancle()
                setResult({
                    success: true,
                    msg: "Successfully Added attendance."
                })

            },
            // fallback
            (err) => {
                onCancle()
                setResult({
                    fail: true,
                    msg: err
                })

            })
    }

    return (
        <Model>
            <div className='w-full overflow-y-scroll relative flex flex-col'>

                <button onClick={onCancle} className='p-3 bg-gray-200 hover:bg-gray-300 ml-auto m-3 rounded-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                <h4 className='text-xl text-center my-4'>Add Attendance for <span className='text-green-500'>{currentClass}</span></h4>

                {/* date input */}
                <div className='flex items-center border-b boder-[2px] py-3'>
                    <p className='text-lg px-3 '>Date</p>
                    <input className='border rounded-lg px-3 py-2 text-lg focus:border-green-600' type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>



                <table className='w-full'>
                    <thead>
                        <tr className='border-b'>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            attendances.map(st => (
                                <tr key={st._id} className='border-b text-lg leading-10'>
                                    <td className='text-center'>{st.name}</td>
                                    <td className={`text-center ${st.present ? "text-green-600" : "text-red-600"}`}>{st.present ? 'Present' : "Absent"}</td>
                                    <td className={`flex items-center justify-center ${st.present ? "text-red-600" : "text-green-600"}  `}>
                                        <button onClick={() => onEdit(st)}>
                                            {
                                                st.present ?

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <button onClick={onSubmit} className='m-8 self-start px-4 py-2 bg-green-500 text-lg text-white rounded-l-full rounded-r-full hover:bg-green-600 hover:scale-90'>Submit</button>

            </div>

        </Model>
    )
}


//// 
const FoldAttend = ({ attends, label, setOpenModel, setCurrentClass, setResult }) => {

    const user = useSelector(state => state.user)

    const onAddAttendance = () => {
        setOpenModel(true)
        setCurrentClass(label)
    }


    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {label}
                </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel className="px-2 md:px-4">
                {
                    user.type != 'Student' &&
                    <div className='w-full flex justify-end'>
                        <button onClick={onAddAttendance} className='px-4 mx-4 my-2 py-2 bg-blue-500 rounded-l-full rounded-r-full text-white'>Add Attendance</button>
                    </div>}
                <ViewAttend attends={attends} setResult={setResult} />
            </AccordionItemPanel>
        </AccordionItem>
    )
}


///  class view attendance
const ViewAttend = ({ attends, setResult }) => {



    return (
        <Accordion>
            {
                attends.map(attend => (
                    <AccordionItem key={attend._id}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {attend.date}
                            </AccordionItemButton>
                        </AccordionItemHeading>


                        <AccordionItemPanel>
                            <AttendList attend={attend} setResult={setResult} />
                        </AccordionItemPanel>

                    </AccordionItem>
                ))
            }
        </Accordion>
    )

}


const AttendList = ({ attend, setResult }) => {

    const [attendList, setAttendList] = useState(attend.attendances)
    const dispatch = useDispatch()

    const onUpdate = () => {
        updateAttendance({ ...attend, attendances: attendList },
            // callback
            (data) => {
                dispatch(editAttendance(attend.className, data))
                setResult({
                    success: true,
                    msg: "Attendance updated successfully."
                })
            },
            // fallback
            (err) => {
                setResult({
                    fail: true,
                    msg: err
                })
            })
    }

    const onDelete = () => {
        deleteAttendance(attend._id,
            // callback
            (_attend) => {
                setResult({
                    success: true,
                    msg: "Successfully deleted."
                })
                dispatch(removeAttendance(attend.className, _attend._id))
            },
            // fallback
            (err) => {
                setResult({
                    fail: true,
                    msg: err
                })
            }
        )
    }

    const toggleAttend = (at) => {
        setAttendList(
            attendList.filter(a => {
                if (at.id === a.id) {
                    a.present = !a.present
                    return a
                } return a
            })
        )

    }

    const user = useSelector(state => state.user)

    return (
        <div className='w-full relative py-10'>
            {
                user.type != 'Student' &&

                <div className="absolute -top-2 right-0 flex">
                    <button onClick={onUpdate} className='py-2 px-3 text-white rounded-l-xl bg-green-600 hover:bg-green-700 hover:scale-90 transition-all duration-300 flex items-center justify-center'>
                        Save
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </button>

                    <button onClick={onDelete} className='py-2 px-3 text-white rounded-r-xl bg-red-600 hover:bg-red-700 hover:scale-90 transition-all duration-300 flex items-center justify-center'>
                        Delete
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            }
            <table className='table-auto w-full'>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        {
                            user.type != 'Student' &&
                            <th>Edit</th>
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        attendList.map(at => (
                            <tr key={at.id} className='border-b hover:bg-gray-200'>
                                <td className='text-center font-semibold text-gray-700 text-lg py-2 '>{at.name}</td>
                                <td className={`text-center font-semibold text-lg  ${at.present ? 'text-green-500' : 'text-red-500'}`}>{at.present ? 'Present' : "Absent"}</td>
                                {
                                    user.type !== 'Student' &&
                                    <td className='text-center'>
                                        <button onClick={() => toggleAttend(at)}
                                            className={`${at.present ? 'text-red-500' : 'text-green-500'}`}
                                        >
                                            {
                                                at.present ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    :

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>

                                            }

                                        </button>
                                    </td>
                                }
                                <td>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Attendance
