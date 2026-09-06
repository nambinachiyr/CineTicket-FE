import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import close from "../../assets/close (1).png"
import ticket from "../../assets/ticket1.png"

const BookingSuccess = () => {
    const bookedTicket = useLoaderData()
    // console.log(bookedTicket)
    const navi = useNavigate()
    // console.log(bookedTicket)
    const lang = bookedTicket?.movie?.original_language === 'ta' ? 'Tamil' :
        bookedTicket?.movie?.original_language === 'en' ? 'English' :
            bookedTicket?.movie?.original_language === 'ml' ? 'malayalam' :
                bookedTicket?.movie?.original_language === 'hi' ? 'Hindi' :
                    bookedTicket?.movie?.original_language === 'te' ? 'Telugu' :
                        bookedTicket?.movie?.original_language === 'kn' ? 'kannada' : ''

    if (!bookedTicket?.movie) {
        return (
            <div className='min-h-screen flex justify-center items-center text-red-500 tracking-normal text-sm'>
                Booking Not Found
            </div>
        )
    }
    return (
        <>
            <div className='bg-[#FAFBFA] p-2 print:hidden lg:flex items-center justify-center'>
                <img onClick={() => navi('/')} className='shadow w-6 fixed top-3 right-3 md:top-20 md:right-30 transition-all duration-300 hover:scale-80 hover:shadow-4xl hover:cursor-pointer bg-red-500 rounded-lg ' src={close} alt="" />
                <div className='flex flex-col w-full max-w-[1400px] md:w-xl min-h-screen gap-5 justify-center mx-auto tracking-wider'>
                    <p className="text-2xl text-center font-bold uppercase tracking-[0.02em] text-green-600">🥳Booking Confirmed🥳</p>
                    <h1 className='text-sm font-semibold tracking-widest text-center text-red-500'>Your Booking ✔️</h1>
                    <div className='border border-white/10 overflow-hidden bg-[#111722]/15 text-white rounded-xl shadow-[1px_10px_15px_rgba(0,0,0,0.55)] flex flex-col gap-4 p-3 '>
                        {/* <p className='text-right'>status : {bookedTicket.paymentStatus}</p> */}
                        <div className='flex justify-between flex-wrap '>
                            <p className='text-sm text-neutral-600'>Movie : <span className='text-lg sm:text-xl font-semibold text-neutral-800'>{bookedTicket?.movie?.title}</span></p>
                            <p className='text-sm font-semibold text-neutral-900 md:text-[17px]'><span className='font-medium text-[17px]'>⟟</span>{bookedTicket?.theater?.name}, <span>{bookedTicket?.theater?.address?.split(',').at(-1)}</span></p>
                        </div>
                        <div className='tracking-widest flex justify-between flex-row-reverse p-2'>
                            <span className='text-neutral-900'>{lang}</span>
                            <p className='text-neutral-900'>{bookedTicket?.screen?.name}</p>
                        </div>
                        <div className='flex gap-3 text-neutral-900'>
                            Date {'->'}
                            <p>{bookedTicket?.show?.showDate} </p>
                            <p>{bookedTicket?.show?.showTime}</p>
                        </div>
                        <div className='flex flex-wrap justify-between items-center text-neutral-900'>
                            <div className='flex flex-wrap text-gray-500 justify-center items-center'>
                                seats - {bookedTicket?.bookedSeats?.map(((s, index) => <p className='text-[15px] font-semibold text-neutral-900' key={s}> {s}<span className='font-bold'>{bookedTicket?.bookedSeats?.length - 1 !== index ? <span className='mx-2 font-medium'>| </span> : " "}</span></p>))}
                            </div>

                            <p className='text-right text-sm text-gray-500'>Total Price :<span className='font-bold text-neutral-900'>₹{bookedTicket?.totalPrice} /-</span> </p>
                        </div>
                    </div>
                    {/* Print Button */}
                    <div>
                        <button onClick={() => window.print()}
                            className='bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-2xl shadow-[1px_10px_15px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-95'
                        >Print Ticket</button>
                    </div>
                </div>
            </div>


            {/* Print Only Ticket */}
            <div className='hidden print:block bg-white p-8 text-black'>

                <div className='max-w-xl mx-auto border-2 border-black p-6 rounded-lg'>
                    <h1 className='text-3xl font-bold mb-2 text-center text-[#ffa216] flex justify-center items-center gap-2'><img src={ticket} className='w-7 h-7 object-contain' alt="ticket logo" /> <span>Cine Tickets</span></h1>


                    <h2 className='text-center font-semibold text-green-600 text-xl mb-4'>Booking Confirmed</h2>

                    <p className='text-center font-semibold text-green-600 text-xl mb-6'>Your movie ticket has been successfully booked.</p>

                    <hr className='border-black mb-5' />

                    <h3 className='text-center'>Booking Details</h3>
                    <div className='space-y-3 text-lg'>
                        <p><b>Movie :</b> {bookedTicket.movie.title}</p>
                        <p><b>Theater :</b> {bookedTicket.theater.name}</p>
                        <p><b>Address :</b> {bookedTicket.theater.address}</p>
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