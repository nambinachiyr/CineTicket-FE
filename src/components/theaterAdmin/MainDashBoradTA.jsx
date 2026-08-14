import React, { useEffect, useState } from 'react'
import theaterInstance from '../../axioInstances/theaterAdmin/theaterAdminDash'
import menu from "../../assets/hamburger.png"
import SideBarTA from './SideBarTA'
import { useNavigate } from 'react-router-dom'
import LoadSpinContent from '../user/LoadSpinContent'

const MainDashBoradTA = () => {
    const navi = useNavigate()
    const [data, setData] = useState(null)
    const [openSideBar, setOpenSideBar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [theaterName,setTheaterName] = useState('')
    const [theaterAdd,setTheaterAdd] = useState('')
    

    useEffect(() => {
        async function dashboardDetails() {
            try {
                setLoading(true)
                const response = await theaterInstance.get('/dash')
                console.log(response?.data)
                setData(response?.data)
                setTheaterName(data?.admin?.theaterId?.name)
                setTheaterAdd(data?.admin?.theaterId?.address)
                setLoading(false)
            } catch (err) {
                console.log(err.response?.data?.message)
                // setLoading(false)
                return []
            } finally {
                setLoading(false)
            }
        }
        
        dashboardDetails()
    }, [])
    
    console.log(data?.admin?.theaterId?.name)
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
        <div className='flex relative flex-col gap-1 justify-center items-center py-2'>
            <img onClick={handleSideBar} className='self-start hover:cursor-pointer  md:hidden ml-3 p-1 rounded-lg border border-blue-600 hover:shadow-2xl hover:scale-90 duration-200 transition-all' src={menu} alt="Menu button" />
            <div className='md:block z-50'>  {openSideBar && <SideBarTA data={data} setOpenSideBar={setOpenSideBar} />}</div>
            {loading ? <LoadSpinContent /> :                     
                <div className='flex  flex-col gap-5'>
                    <div className='flex w-full items-end px-3 md:flex-row border-b justify-center border-gray-700 text-red-700 flex-col lg:text-xl gap-1'>
                        <p>{theaterName || ''} , </p>
                        <p className=''>{theaterAdd || ''}</p>
                    </div>
                    <h1 className='text-2xl text-center tracking-wider'>Hi, <span className='font-semibold text-red-400'>{data?.admin?.name}</span></h1>
                    
                    <div className='grid grid-cols-3 gap-3 justify-center items-center px-6'>
                        <p className='col-span-1 row-span-2'></p>
                        <div onClick={()=>navi('/theater-admin/screens')} className=' border hover:border-red-500 hover:bg-white hover:text-black hover:cursor-pointer border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>
                            <h1>Screens</h1>
                            <p className=''>{data?.totalScreens}</p>
                        </div>
                        <div onClick={()=>navi('/theater-admin/shows')
                        
                        }  className=' border hover:border-red-500 hover:bg-white hover:text-black hover:cursor-pointer border-dashed text-center font-semibold flex flex-col gap-2 tracking-wider text-amber-50 text-xl p-2'>

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
                    <div className='md:flex md:justify-center md:items-center min-h-[60vh]'>
                    
                        <div className='border border-2 border-gray-200 text-white md:w-120 mx-1'>
                            <p className='text-center border-b p-1 text-red-600 border-gray-200'>Popular Movies</p>
                            <p className='flex justify-between py-1 px-2 text-gray-300 font-semibold'>
                                <span className='border-r-2 w-40'>Movies</span>
                                <span className='border-r-2 w-26 '>BookingCount</span>
                                <span>Revenue</span>
                            </p>
                            {
                                data?.popularMovie?.map((movie,index)=>(
                                   <div className='flex justify-between px-3 py-1 items-center border-t' key={index}>
                                    <p className='border-r-2 w-40'>{movie.title}</p>
                                    <p className='border-r-2 px-3'>{movie.bookingCount}</p>
                                    <p>{movie.revenue}</p>
                                   </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                  
            }
        </div>
    )
}

export default MainDashBoradTA