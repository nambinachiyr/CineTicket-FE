import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import leftArrow from "../../assets/left-arrow.png"
import bookingInstance from '../../axioInstances/user/bookingInstance'

const SingleBookingTicket = () => {
    const data = useLoaderData()
    console.log(data)
    const navi = useNavigate()

    const lang = {
      ta  :"Tamil",
      en  :"English",
      ml  :"Malayalam",
      hi  :"Hindi",
      te  :"Telugu",
       kn :"Kannadam",
    }
    const date = new Date(data.updatedAt)
    const updatedDate = date.toLocaleDateString("en-IN")
    const time = date.toLocaleTimeString("en-IN")

    async function handleCancelled(){
        try{
             const response = await bookingInstance.put(`/cancel/${data?._id}`)
             console.log(response?.data?.cancelData)
             navi(-1)
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div>
        <div className='bg-[#fffee4] lg:px-20 min-h-screen flex flex-col object-contain gap-3 p-4 md:text-xl lg:text-2xl'>
            <img onClick={()=>navi(-1)} className='w-8 h-8 md:w-10 md:h-12 lg:w-12 lg:h-12  p-1 ml-3 hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full'  src={leftArrow} alt="" />
            <img className=' h-50 md:h-50 md:w-50' src={`https://image.tmdb.org/t/p/original${data?.movie?.poster_path?data?.movie?.poster_path:data?.movie?.backdrop_path}`} alt="" />
            <p className='text-2xl md:text-3xl text-center font-semibold'>{data?.movie?.title}</p>
            <p className='text-right text-lg md:text-xl'>Language : {lang[`${data?.movie?.original_language}`]}</p>
            <p className='font-semibold text-lg md:text-2xl flex flex-col'>{data?.theater?.name},
                <span> {data?.theater?.address.split(',')[0]+', '+data?.theater?.address.split(',')[1]},</span><span>{data?.theater?.address.split(',').at(-1)}</span></p>
            <p className='text-[18px] md:text-2xl'>Screen : {data?.screen?.name} </p>
            <div className='flex text-2xl gap-2'>Seat : {data?.bookedSeats?.map((s,index)=>(
                <p key={s} className='text-2xl'> { s}<span>{index!==data?.bookedSeats.length?" ":", "}</span></p>
            ))}</div>
            <p className='flex gap-2'>Show Date & Time :
                <span className='pr-3 border-r-2'>{data?.show?.showDate} </span>
                <span>{data?.show?.showTime}</span>
            </p>
            <p className='md:text-right md:text-2xl'>Price : {data?.totalPrice}</p>
            {
                data?.cancelledAt && <p>{data?.cancelledAt}</p>
            }
            <div className='flex gap-2'>
                <p>Booking Status :</p>
                <p>{data?.bookingStatus==="Booked"?'🟢':'🔴'} {data?.bookingStatus}</p>
                
            </div>
            <div className='flex gap-2'>
                <p>Payment Status :</p>
                <p>{data?.paymentStatus==="Success"?'🟢':'🔴'} {data?.paymentStatus}</p>
            </div>
            <p className='flex gap-2 items-end justify-end'>
                <span className='mr-auto'>Booked On</span>
                <span>{updatedDate}</span>
            <span className=''>{time}</span></p>
            <hr></hr>
            <p>Your BookingID : {data?._id}</p>

        <button onClick={handleCancelled} className='border py-2 bg-amber-300 text-gray-800 text-lg'>Cancel</button>
        </div>
    </div>
  )
}

export default SingleBookingTicket