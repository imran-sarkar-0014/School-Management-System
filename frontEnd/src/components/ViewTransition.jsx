import { useState, useEffect } from 'react'
import { transDetails } from '../api/expressApi'

const ViewTransition = ({ id }) => {

    const [trans, setTrans] = useState({})

    useEffect(() => {
        transDetails(id, (t) => {
            setTrans(t)
        })
    }, [])

    return (
        <div className='border m-2 rounded-md p-2'>
            <div className='flex '>
                <h1 className='px-2 font-medium'>Type  :</h1>
                <h1>{trans?.type}</h1>
            </div>
            <div className='flex '>
                <h1 className='px-2 font-medium'>Amount  :</h1>
                <h1>{trans?.amount}</h1>
            </div>
            <div className='flex '>
                <h1 className='px-2 font-medium'>Payer  :</h1>
                <h1>{trans?.payerName}</h1>
            </div>
        </div>
    )
}

export default ViewTransition