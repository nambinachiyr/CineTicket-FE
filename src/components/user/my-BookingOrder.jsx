import React, { useEffect, useState } from 'react'
import bookingInstance from '../../axioInstances/user/bookingInstance'
import { Link } from 'react-router-dom'
import LoadSpin from './LoadSpinButton'

const My_BookingOrder = () => {
    const [allBookings,setAllBookings] = useState([])
    const [noBooking,setNoBooking] = useState(false)
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const allBooking = async()=>{
            try{
                setLoading(true)
               const response = await bookingInstance.get('/my_booking')
            //    console.log(response?.data?.myTicket)
               return setAllBookings(response?.data?.myTicket || [])
            }catch(err){
               setError(err?.response?.data?.message || "Unable to load your bookings")
               return setNoBooking(true)
            }finally{
                setLoading(false)
            }
        }
        allBooking()
    },[])
  return (

    <div className='mx-auto'>

        {
            loading && (
                <div className='flex min-h-[50vh] w-full items-center justify-center'>
                    <LoadSpin/>
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
            noBooking?(
              <p className='text-red-600 text-xl md:text-2xl'>You have No Booking</p>) :(
            allBookings?.length!==0&&allBookings?.map((b)=>(
           <div className='border border-dashed flex flex-col mb-2'>
            <Link to={`/bookingdetail/${b._id}`} key={b?._id} className='py-3 px-2 mt-2 border-dashed'>
                <p>🎬 {b?.movie?.title} </p>
                <div className='flex gap-2'>
                    <p>📅 {b?.show?.showDate} </p>
                    <p className='font-extrabold'>|</p>
                   <p>🕒 {b?.show?.showTime}</p>
                </div>
                <p>{b.bookingStatus==="Booked"?'🟢':'🔴'} {b?.bookingStatus}</p>
            </Link>
            </div>
            )
            ))
        }
    </div>
  )
}

export default My_BookingOrder