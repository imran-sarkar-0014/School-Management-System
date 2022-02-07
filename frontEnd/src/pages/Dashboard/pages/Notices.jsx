import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Model from '../../../components/Model'
import ControllModel from '../../../components/ControllModel'
import { postNotice, updateNotice, deleteNotice } from '../../../api/expressApi'
import { addNotice, updateNotice as noticeUpdate, deleteNotice as noticeDelete } from '../../../store/actions/notice'

// notice view
const ViewNotice = ({ note, setOpen, setCurrentNotice, setType, setResult }) => {

    const onEdit = (id) => {
        setCurrentNotice(note)
        setType('edit')
        setOpen(true)
    }

    const dispatch = useDispatch()

    const onDelete = (id) => {
        deleteNotice(id,
            (res) => {
                dispatch(noticeDelete(res._id))
            },
            (err) => {
                setResult({
                    success: false,
                    fail: true,
                    msg: err
                })
            }
        )

    }

    const user = useSelector(state => state.user)

    return (
        <div className='m-4 p-3 border rounded-md relative'>
            <h4 className='text-2xl font-medium underline my-3'>{note.header}</h4>
            <div className=''></div>
            <p>{note.body}</p>

            {
                user.type != 'Student' &&

                <div className='absolute top-0 right-2'>
                    <button onClick={() => onEdit(note._id)} className='rounded-l-lg px-3 py-1 bg-blue-500 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button onClick={() => onDelete(note._id)} className='rounded-r-lg px-3 py-1 bg-red-500 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>


                </div>
            }

            <div className='pt-5 text-gray-500'>
                <p>posted by your {note.userType.toLowerCase()} "{note.noticerName}" </p>
                <p>on {note.updatedAt}</p>
            </div>

        </div>
    )
}


/// add notice model

const NoticeModel = ({ type, currentNotic = null, setCurrentNotice, setOpen, setType, setResult }) => {

    const clickAway = () => {
        setType('')
        setOpen(false)
        setCurrentNotice(null)
    }

    const [header, setHeader] = useState(type === 'edit' && currentNotic ? currentNotic.header : '')
    const [body, setBody] = useState(type === 'edit' && currentNotic ? currentNotic.body : '')

    const dispatch = useDispatch()


    const onSubmit = (e) => {
        e.preventDefault()

        if (type === 'edit') {
            updateNotice(currentNotic._id,
                { header, body },
                //callback
                (res) => {
                    dispatch(noticeUpdate(res))
                },
                //fallback
                (err) => {
                    setResult({
                        success: false,
                        fail: true,
                        msg: err
                    })
                })
        } else {
            postNotice({ header, body },
                // callback
                (res) => {
                    dispatch(addNotice(res))
                },
                // fallback
                (err) => {
                    setResult({
                        success: false,
                        fail: true,
                        msg: err
                    })
                })
        }

        clickAway()
    }

    return (
        <Model clickAway={clickAway} >

            <form onSubmit={onSubmit} className='w-full flex flex-col p-4'>
                <label className='font-medium text-xl' >Header</label>
                <input className='border border-gray-700 focus:border-2 focus:border-blue-500 rounded-md py-3 px-2 text-lg' value={header} onChange={(e) => setHeader(e.target.value)} type="text" placeholder='Type you heading....' />
                <h3 className='font-lighter text-lg my-2'>Body</h3>
                <textarea className='border border-gray-700 focus:border-2 focus:border-blue-500 rounded-lg p-2 h-[250px]' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Add description....' ></textarea>

                <button className='block self-start px-4 py-2 my-3 bg-cyan-500 text-white rounded-l-full rounded-r-full hover:bg-cyan-600'>Submit</button>
            </form>

        </Model>
    )
}



const Notices = () => {

    const user = useSelector(state => state.user)
    const notices = useSelector(state => state.notice)

    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const [currentNotic, setCurrentNotice] = useState(null)

    const [result, setResult] = useState({
        success: false,
        fail: false,
        msg: ''
    })

    const createNotice = () => {
        setType('create')
        setCurrentNotice(null)
        setOpen(true)
    }

    return (
        <div className=''>
            {
                user.type !== 'Student' ?
                    <div className='p-4'>
                        <button onClick={createNotice} className='px-4 py-2 bg-cyan-500 text-white font-medium rounded-l-full rounded-r-full transition-all duration-300 hover:bg-cyan-600'>Add Notice</button>
                        <div className='w-full mx-auto h-[2px] my-3 bg-gray-900'></div>
                    </div> : null
            }
            <h3 className='font-medium text-3xl text-gray-600'>Notice Box</h3>

            <div>
                {
                    notices.map(note => (
                        <ViewNotice key={note._id} note={note} setCurrentNotice={setCurrentNotice} setOpen={setOpen} setType={setType} setResult={setResult} />
                    ))
                }
            </div>

            {
                open &&
                <NoticeModel setOpen={setOpen} currentNotic={currentNotic} setCurrentNotice={setCurrentNotice} type={type} setType={setType} setResult={setResult} />
            }

            <ControllModel result={result} setResult={setResult} />

        </div>
    )
}

export default Notices

