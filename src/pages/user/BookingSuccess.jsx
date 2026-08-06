import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import close from "../../assets/close (1).png"
import ticket from "../../assets/ticket1.png"

const BookingSuccess = () => {
    const bookedTicket = useLoaderData()
    console.log(bookedTicket)
    const navi = useNavigate()
    console.log(bookedTicket)
    const lang = bookedTicket?.movie?.original_language === 'ta' ? 'Tamil' :
        bookedTicket?.movie?.original_language === 'en' ? 'English' :
            bookedTicket?.movie?.original_language === 'ml' ? 'malayalam' :
                bookedTicket?.movie?.original_language === 'hi' ? 'Hindi' :
                    bookedTicket?.movie?.original_language === 'te' ? 'Telugu' :
                        bookedTicket?.movie?.original_language === 'kn' ? 'kannada' : ''

    if(!bookedTicket?.movie){
        return(
            <div className='min-h-screen flex justify-center items-center'>
                Booking Not Found
            </div>
        )
    }
    return (
        <>
        <div className='bg-yellow-50/34 p-2 print:hidden'>
           <img onClick={()=>navi('/')} className='shadow  transition-all duration-300 hover:scale-80 hover:shadow-4xl hover:cursor-pointer bg-yellow-50 hover:shadow-olive-400' src={close} alt="" />
        <div className='flex flex-col min-h-screen gap-5  justify-center tracking-wider'>
            <h1 className='text-2xl font-semibold text-center text-yellow-500 '>Your Booking</h1>
            <div className='border border-amber-300 rounded-xl shadow-xl shadow-yellow-200 flex flex-col gap-4 p-3 bg-yellow-300/10 '>
                {/* <p className='text-right'>status : {bookedTicket.paymentStatus}</p> */}
                <p className='text-right text-xl'>Price : ₹{bookedTicket?.totalPrice}</p>
                <div>
                    <p className='text-xl '>Movie : <span className='text-2xl font-semibold'>{bookedTicket?.movie?.title}</span></p>
                    <p className='text-xl font-semibold'>{bookedTicket?.theater?.name}, <span>{bookedTicket?.theater?.address?.split(',').at(-1)}</span></p>
                </div>
                <div className='tracking-widest flex justify-between flex-row-reverse p-2'>
                    <span className=''>{lang}</span>
                    <p>{bookedTicket?.screen?.name}</p>
                </div>
                <div className='flex gap-3'>
                    <p>{bookedTicket?.show?.showDate} </p>
                    <p>{bookedTicket?.show?.showTime}</p>
                </div>
                <div className='flex flex-wrap'>seats - {bookedTicket?.bookedSeats?.map(((s, index) => <p className='text-[17px] font-semibold' key={s}> {s} <span className='font-bold'>{bookedTicket?.bookedSeats?.length - 1 !== index ? "|" : ""}</span></p>))}</div>
            </div>
        {/* Print Button */}
        <div>
            <button onClick={()=>window.print()}
                className='bg-yellow-500 hover:cursor-pointer hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-2xl shadow-lg transition-all duration-300 hover:scale-95'
                >Print Ticket</button>
        </div>
        </div>
        </div>


{/* Print Only Ticket */}
        <div className='hidden print:block bg-white p-8 text-black'>

        <div className='mx-w-xl mx-auto border-2 border-black p-6 rounded-lg'>
         <h1 className='text-3xl font-bold mb-2 text-center text-[#ffa216] flex justify-center items-center gap-2'><img src={ticket} className='w-7 h-7 object-contain' alt="ticket logo" /> <span>Cine Tickets</span></h1>

        
        <h2 className='text-center font-semibold text-green-600 text-xl mb-4'>Booking Confirmed</h2>

        <p className='text-center font-semibold text-green-600 text-xl mb-6'>Your movie ticket has been successfully booked.</p>

        <hr className='border-black mb-5'/>

        <h3  className='text-center'>Booking Details</h3>
       <div className='space-y-3 text-lg'>
        <p><b>Movie :</b> {bookedTicket.movie.title}</p>
        <p><b>Theater :</b> {bookedTicket.theater.name}</p>
        <p><b>Theater :</b> {bookedTicket.theater.address}</p>
        <p><b>Screen :</b> {bookedTicket.screen.name}</p>
        <p><b>Date :</b> {bookedTicket.show.showDate}</p>
        <p><b>Time :</b> {bookedTicket.show.showTime}</p>
        <p><b>Seats :</b> {bookedTicket.bookedSeats.join(', ')}</p>
        <p><b>Total Price :</b> ₹{bookedTicket.totalPrice}</p>
</div>
        <hr></hr>

        <p className='text-center my-1'>💛 Thank you for booking with Cine Tickets 💛</p>
        </div>
        </div>
        </>
    )
}

export default BookingSuccess