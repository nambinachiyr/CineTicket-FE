import React, { useContext, useEffect, useState } from 'react'
import bookingInstance from '../../axioInstances/user/bookingInstance'
import {  useNavigate } from 'react-router-dom'
import LoadSpin from './LoadSpinButton'
import { contextValue } from '../../contextvaluses/ContextValue'

const My_BookingOrder = () => {
    const [allBookings, setAllBookings] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const {setContextBooking,setContextHome} = useContext(contextValue)

    const navi = useNavigate()
    useEffect(() => {
        const allBooking = async () => {
            try {
                setContextBooking(true)
                setContextHome(false)
                setLoading(true)
                setError('')
                const response = await bookingInstance.get('/my_booking')
                //    console.log(response?.data?.myTicket)
                return setAllBookings(response?.data?.myTicket || [])
            } catch (err) {
                
                return setError(err?.response?.data?.message || "Unable to load your bookings")
            } finally {
                setLoading(false)
            }
        }
        allBooking()
    }, [])
    return (

        <div className=' min-h-screen '>

            {
                loading && (
                    <div className='flex min-h-[50vh] w-full items-center  justify-center'>
                        <LoadSpin />
                    </div>
                )
            }
            {
                !loading && error && (
                    <div className='flex min-h-[40vh] items-center justify-center'>
                        <p className='text-center text-sm text-red-500'>
                            {error}
                        </p>
                    </div>
                )
            }

            {
                !loading && !error && allBookings.length===0? (
                    <p className='text-red-600 text-xl  md:text-2xl'>You have No Booking</p>) : (
                    allBookings?.length !== 0 && allBookings?.map((b) => (
                        <div key={b?._id} className='border mt-3 bg-red-50 border-white/20 shadow-lg flex md:text-[12px] font-semibold text-gray-700 flex-col mb-2'>
                            <div className='py-2 border-dashed flex flex-col gap-1 px-5'>
                                <p className='text-red-700 flex md:text-[13px] flex-col md:block text-[13px]'><span className='text-gray-700'><span className='text-[13px] text-gray-400'>Movie Name:</span> </span> {b?.movie?.title} </p>
                                <p className='flex flex-col md:block text-[14px] md:text-[13px]'><span className='text-[11px] text-gray-500'>Theatre : </span>{b?.theater?.name},{b?.theater?.address}</p>
                                <p><span className='text-[11px] text-gray-500'>Seats: </span><span className='text-[12px] font-semibold md:text-[12px]'>{b?.bookedSeats?.join(', ')}</span></p>
                                <div className='flex gap-2 text-[11px]'>
                                    <p>📅 {b?.show?.showDate} </p>
                                    <p className='font-extrabold hidden md:flex'>|</p>
                                    <p>🕒 {b?.show?.showTime}</p>
                                </div>
                               <div className='flex justify-between'>
                                 <p className='text-[13px] flex justify-center items-center w-fit gap-1'>{b.bookingStatus === "Booked" ? <span className='text-[8px]'>🟢</span> : <span className='text-[8px]'>🔴</span>} {b?.bookingStatus}</p>

                                <button onClick={()=>navi(`/bookingdetail/${b._id}`)} className='text-left border w-fit px-3 text-sm bg-red-500 text-white hover:cursor-pointer border-red-500 hover:bg-red-600 rounded-lg'>view</button>
                               </div>
                            </div>
                        </div>
                    )
                    ))
            }
        </div>
    )
}

export default My_BookingOrder