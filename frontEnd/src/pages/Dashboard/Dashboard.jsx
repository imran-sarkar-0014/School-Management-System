import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import CommonHeader from '../../components/CommonHeader'
import CommonFooter from '../../components/CommonFooter'


import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/SideBar'
import DashboardContainer from './DashboardContainer'



const Dashboard = () => {

    const token = useSelector(state => state.token)
    const user = useSelector(state => state.user)

    const [wMin, setWMin] = useState(false)
    useEffect(() => {
        const resizeHandler = (e) => {
            if (window.innerWidth > 768) {
                setWMin(false)
            }
            else {
                setWMin(true)
            }
        }

        resizeHandler()

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])


    return (
        <div className='h-screen'>

            {
                user?._id === undefined ?
                    (
                        <div className='h-full flex flex-col'>
                            <CommonHeader />
                            <div className='flex-1 flex items-center justify-center'>
                                <h2 className='text-3xl text-gray-700 font-medium'>First Login and continue.</h2>
                            </div>
                            <CommonFooter />
                        </div>
                    )
                    :
                    (
                        <div className='h-full flex flex-col'>

                            <DashboardHeader />
                            <div className='flex-1 flex relative overflow-y-hidden'>

                                {/* Sidebar */}
                                <SideBar user={user} for='' wMin={wMin} />

                                {/* MainContain and MainContain contain routes*/}
                                < DashboardContainer user={user} wMin={wMin} />
                            </div>
                        </div>
                    )

            }

        </div>
    )
}

export default Dashboard
