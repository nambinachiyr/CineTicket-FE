import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import leftArrow from "../../assets/left-arrow.png"
import bookingInstance from '../../axioInstances/user/bookingInstance'
import toast from 'react-hot-toast'
import LoadSpinContent from '../../components/user/LoadSpinContent'

const SingleBookingTicket = () => {
    const data = useLoaderData()
    if(!data){
        return(
            <div className='min-h-screen flex justify-center items-center'><LoadSpinContent/></div>
        )
    }
    console.log(data)
    const navi = useNavigate()

    const [cancelling,setCancelling] = useState(false)
    const lang = {
        ta: "Tamil",
        en: "English",
        ml: "Malayalam",
        hi: "Hindi",
        te: "Telugu",
        kn: "Kannada",
    }
    const date = new Date(data.updatedAt)
    const updatedDate = date.toLocaleDateString("en-IN")
    const time = date.toLocaleTimeString("en-IN")
    console.log(data?.createdAt)

    const bookDate = new Date(data?.createdAt)
    const CreateDate = bookDate.toLocaleDateString("en-IN")
    const CreateTime = bookDate.toLocaleTimeString("en-IN")

    async function handleCancelled() {
        const ok = window.confirm("Are you sure you want to cancel this booking?")
        if(!ok) return
        
        try {
            setCancelling(true)
            const response = await bookingInstance.put(`/cancel/${data?._id}`)
            console.log(response?.data?.cancelData)
            toast.success("Booking Cancelled Successfully")
            navi(-1)
        } catch (err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message)
        }finally{
            setCancelling(false)
        }
    }

    return (
        <div>
            <div className='bg-[#F1Fefb] text-gray-700 lg:px-20 min-h-screen m-1 flex flex-col object-contain gap-3 p-4 md:text-xl lg:text-2xl'>
                <img onClick={() => navi(-1)} className='w-8 h-8 p-2  hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-red-500 rounded-full' src={leftArrow} alt="" />
                 <p className='text-end text-[16px]'>
                    <span className='mr-auto text-[14px]'>Booked On :  </span>
                    <span className='text-[15px] font-bold'>{CreateDate} | </span>
                    <span className='text-[15px] font-bold'>{CreateTime}</span>
                </p>
                <div className='flex flex-col gap-10 md:flex-row md:justify-evenly'>
                <img className=' h-50 object-cover md:self-center md:h-75 md:w-70 lg:w-85 lg:h-110' src={`https://image.tmdb.org/t/p/original${data?.movie?.poster_path ? data?.movie?.poster_path : data?.movie?.backdrop_path}`} alt="" />

                <div className='flex flex-col gap-3'>
                    <p className='text-2xl md:text-3xl text-center font-bold text-red-500'>{data?.movie?.title}</p>
                <p className='text-right text-[16px] font-semibold'><span className='text-sm text-gray-900 font-normal'>Language : </span>{lang[`${data?.movie?.original_language}`]}</p>
                <p className='font-semibold text-[16px] flex justify-between gap-2'><span>TheatreName :</span><span className='font-bold'>{data?.theater?.name || "TheaterName is not available"},</span></p>
                   <p className='text-[16px] flex justify-between'><span>Address :</span>{data?.theater?.address? <span className='font-semibold text-[16px]'> {data?.theater?.address?.split(',')[0] + ', ' + data?.theater?.address.split(',')[1]},{data?.theater?.address.split(',').at(-1)}</span>:"Address is not available"}</p>
                <p className='text-[16px] font-semibold flex justify-between'><span className='font-normal'>Screen : </span><span className='self-center'>{data?.screen?.name}</span> </p>
                <div className='flex justify-between'>
                    <p className='gap-2 text-[16px] flex flex-col'><span className='font-semibold'>Date</span><span className='pr-3 font-bold'>{data?.show?.showDate} </span></p>
                    <p className='border-r-2'></p>
                    <p className='gap-2 text-[16px] flex flex-col'><span className='font-semibold'>Time</span><span className='font-bold'>{data?.show?.showTime}</span></p>
                </div>
                <div className='text-[16px] gap-2 flex justify-between'>Seat :
                    <p className='text-[16px] font-bold flex justify-between self-center'> {data?.bookedSeats?.join(', ')}</p>
               </div>
                <p className='font-semibold text-[16px] flex justify-between'><span className='font-semibold'>Price :</span> <span className='text-[18px]'>₹ {data?.totalPrice}</span></p>
               
                <div className='flex gap-2 text-[15px] justify-between'>
                    <p className='text-[14px]'>Booking Status :</p>
                    <p className='font-semibold flex justify-center items-center gap-2'>{data?.bookingStatus === "Booked" ? <span className='text-[10px]'>🟢<span className='text-[16px] ml-1'>Confirmed</span></span> : <span className='text-[10px]'>🔴<span className='text-[16px] ml-1'>Cancelled</span></span>}</p>

                </div>
                <div className='flex justify-between gap-2 text-[15px]'>
                    <p className='text-[14px]'>Payment Status :</p>
                    <p className='font-semibold flex justify-center items-center self-center gap-2'>{data?.paymentStatus === "Success" ? <span className='text-[10px] '>🟢<span className='text-[16px] ml-1'>Paid</span></span> : <span className='text-[10px]'>🔴<span className='text-[16px] ml-1'>Failed</span></span>}</p>
                </div>
               
                <hr className='md:hidden'></hr>
                <p className='text-sm underline mt-3 flex md:justify-between lg:mt-0'>Your BookingID : {data?._id}</p>
            </div>
                </div>

                {
                  data?.bookingStatus !=="Cancelled" ?
                  <div className='flex justify-center mt-3 lg:mt-0 md:justify-evenly items-center'>
                    <p></p>
                 <button disabled={cancelling} onClick={handleCancelled} className='border py-2 bg-red-500 px-15 hover:cursor-pointer hover:bg-red-700 active:bg-red-50  text-white border-white/10 rounded-2xl text-lg '>{cancelling?"Cancelling . . . ":"Cancel Booking"}</button>

                </div>
                : <div className='text-center flex justify-end -mt-8 text-[16px]'>
                    <span></span>
                    <p>
                        <span className='mr-auto text-[14px]'>Cancelled On :  </span>
                    <span className='text-[15px] font-bold'>{updatedDate} | </span>
                    <span className='text-[15px] font-bold'>{time}</span>
                    </p>
                </div>
                }

            </div>    
        </div>
    )
}

export default SingleBookingTicket