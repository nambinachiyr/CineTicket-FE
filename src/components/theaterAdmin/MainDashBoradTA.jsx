import React, { useEffect, useState } from 'react'
import theaterInstance from '../../axioInstances/theaterAdmin/theaterAdminDash'
import menu from "../../assets/hamburger.png"
import SideBarTA from './SideBarTA'
import LoadSpinContent from '../user/LoadSpinContent'

const MainDashBoradTA = () => {
    const [data, setData] = useState(null)
    const [openSideBar, setOpenSideBar] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function dashboardDetails() {
            try {
                setLoading(true)
                const response = await theaterInstance.get('/dash')
                console.log(response?.data)
                setData(response?.data)
                setLoading(false)
            } catch (err) {
                console.log(err.response?.data?.message)
                setLoading(false)
                return []
            } finally {
                setLoading(false)
            }
        }

        dashboardDetails()
    }, [])

    function handleSideBar() {
        setOpenSideBar(true)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 700) {
                setOpenSideBar(true)
            } else {
                setOpenSideBar(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div className='flex relative flex-col gap-5 justify-center items-center py-4'>
            <img onClick={handleSideBar} className='self-start hover:cursor-pointer  md:hidden ml-3 p-1 rounded-lg border border-blue-600 hover:shadow-2xl hover:scale-90 duration-200 transition-all' src={menu} alt="Menu button" />
            <div className='md:block z-50'>  {openSideBar && <SideBarTA data={data} setOpenSideBar={setOpenSideBar} />}</div>
            {loading ? <LoadSpinContent /> :                     
                <div className='flex flex-col gap-10'>
                    <h1 className='text-2xl text-center tracking-wider'>Hi, <span className='font-semibold text-yellow-200'>{data?.admin?.name}</span></h1>
                    
                    <div className='grid grid-cols-3 gap-3 justify-center items-center px-6'>
                        <p className='col-span-1 row-span-2'></p>
                        <div className=' border border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>
                            <h1>Screens</h1>
                            <p className='text-yellow-100'>{data?.totalScreens}</p>
                        </div>
                        <div className=' border border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>

                            <h1>Shows</h1>
                            <p>{data?.totalShows}</p>
                        </div>
                        <div className=' border border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>

                            <h1>Booking</h1>
                            <p>{data?.totalBooking}</p>
                        </div>
                        <div className=' border border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>

                            <h1>Revenue</h1>
                            <p>{data?.TotalRevenue}</p>
                        </div>
                    </div>
                </div>
                  
            }
        </div>
    )
}

export default MainDashBoradTA