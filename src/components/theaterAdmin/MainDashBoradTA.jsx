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
                console.log("Dash",response.data)
                const dashData = response?.data
                console.log(dashData)
                setData(dashData)
                setTheaterName(dashData?.admin?.theaterId?.name || "")
                setTheaterAdd(dashData?.admin?.theaterId?.address || "")
                
            } catch (err) {
                console.log(err.message,"err")
                console.log("status:",err.response?.status)
                console.log("data:",err.response?.data)
                // setLoading(false)
                return []
            } finally {
                setLoading(false)
            }
        }
        
        dashboardDetails()
    }, [])
    
    // console.log(data?.admin?.theaterId?.name)
    function handleSideBar() {
        setOpenSideBar(true)
    }
    // console.log(data)

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
        <div className='relative min-h-screen w-full bg-[#070a10] text-white'>
            <img onClick={handleSideBar} className='self-start hover:cursor-pointer  md:hidden ml-3 p-1 rounded-lg border border-white/10 bg-[#111722] hover:scale-90 duration-200 transition-all' src={menu} alt="Menu button" />
                {openSideBar && <SideBarTA data={data} setOpenSideBar={setOpenSideBar} />}
            {loading ?<div className='flex min-h-[70vh] w-full items-center justify-center'> <LoadSpinContent /></div> :                     
                <main className='w-full px-4 py-6 md:ml-[240px] md:w-[calc(100%-240px)] md:px-6 lg:px-8'>
                {/* <div className='px-4 py-6 w-full md:ml-[240px] md:px-6 lg:px-8'> */}
                    <div className='border-b border-white/10 pb-4'>
                        <p className='mt-1 text-xl font-bold sm:text-2xl'>{theaterName || ''} , </p>
                        <p className='mt-1 text-xs text-gray-500 sm:text-sm'>{theaterAdd || ''}</p>
                    </div>
                    <h1 className='text-lg sm:text-xl my-6 text-center tracking-wider'>Hi, <span className='font-semibold text-red-400'>{data?.admin?.name}</span></h1>
                    {/* <div className='mx-auto border-3 '> */}
                    <div className='grid grid-cols-2  mx-auto mr-5 gap-3 lg:grid-cols-4 sm:gap-4 justify-center items-center px-6'>
                        {/* <p className='col-span-1 row-span-2'></p> */}
                        <div onClick={()=>navi('/theater-admin/screens')} className=' border rounded-xl border-white/10 bg-[#111722] p-4 text-left hover:cursor-pointer font-semibold tracking-wider text-xl'>
                            <h1 className="text-xs text-gray-500 sm:text-sm">Screens</h1>
                            <p className='mt-2 text-2xl font-bold sm:text-3xl'>{data?.totalScreens}</p>
                        </div>
                        <div onClick={()=>navi('/theater-admin/shows')
                        
                        }   className=' border rounded-xl border-white/10 bg-[#111722] p-4 text-left hover:cursor-pointer font-semibold tracking-wider text-xl'>

                            <h1 className="text-xs text-gray-500 sm:text-sm">Shows</h1>
                            <p  className='mt-2 text-2xl font-bold sm:text-3xl'>{data?.totalShows}</p>
                        </div>
                        <div  className=' border rounded-xl border-white/10 bg-[#111722] p-4 text-left hover:cursor-pointer font-semibold tracking-wider text-xl'>

                            <h1 className="text-xs text-gray-500 sm:text-sm">Booking</h1>
                            <p  className='mt-2 text-2xl font-bold sm:text-3xl'>{data?.totalBooking}</p>
                        </div>
                        <div className=' border rounded-xl border-white/10 bg-[#111722] p-4 text-left hover:cursor-pointer font-semibold tracking-wider text-xl'>

                            <h1 className="text-xs text-gray-500 sm:text-sm">Revenue</h1>
                            <p  className='mt-2 text-2xl font-bold sm:text-3xl'>{data?.TotalRevenue}</p>
                        </div>
                    </div>
                    <div className='mt-8 w-[100%] rounded-xl border border-white/10 bg-[#111722]'>
                    
                        <div className='border-b px-4 py-3 border-white/10'>
                            <p className='text-base font-semibold sm:text-lg'>Popular Movies</p>
                            
                        </div>
                        <div className='overflow-x-auto'>
                            <div className=' min-w-[520px]'>
                                <div className='grid grid-cols-[230px_80px_80px] lg:grid-cols-[1fr_120px_120px]  gap-3 border-b border-white/10 px-4 py-3 text-xs font-medium text-gray-500 sm:text-sm'>
                                   <span>Movie</span>
                                   <span>Bookings</span>
                                   <span>Revenue</span>
                                </div>

                                {data?.popularMovie?.length>0?(
                                    data?.popularMovie.map((movie,index)=>(
                                        <div key={movie?._id || index}
                                        className='grid grid-cols-[250px_80px_80px] lg:grid-cols-[1fr_120px_120px] gap-3 border-b border-white/5 px-1 py-3 text-sm'>
                                          <p className='truncate text-gray-200'>
                                            {movie?.title}
                                          </p>
                                          <p className='text-gray-400'>
                                            {movie?.bookingCount}
                                          </p>
                                          <p className='text-gray-400'>{movie.revenue}</p>
                                        </div>
                                    ))
                                    
                                ):(
                                        <p className='px-4 py-8 text-center text-sm text-gray-500'>No Booking data available</p>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                {/* </div> */}
                  </main>
            }
        </div>
    )
}

export default MainDashBoradTA