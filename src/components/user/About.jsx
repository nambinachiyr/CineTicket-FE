import React from 'react'
import close from '.../../../src/assets/close (1).png'

const About = ({setIsAbout}) => {
    function handleClose(){
       setIsAbout(false)
    }
  return (
    <div  className={` fixed z-[100] inset-0  flex justify-center items-center px-4 py-6  bg-black/70 backdrop-blur-sm ` }>
    <img onClick={handleClose} aria-label='close' className='hover:cursor-pointer hover:bg-white/10 absolute right-4 top-4 w-5 invert' src={close} alt="" />
    <div className='relative text-yellow-700  w-full max-w-2xl h-[95%] md:h-full bg-[#111722] border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-2xl text-sm font-normal'>
        <h1 className='font-bold text-xl  tracking-[0.12em] text-white sm:text-2xl md:text-3xl text-center'>About Cine Tickets</h1>
        <p  className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
          CineTickets is a movie ticket booking application
          designed to make discovering movies and booking seats
           simple and convenient.
        </p>
        <div className='mt-6 lg:text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2'>
            <p className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Browse movies</p>
            <p className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• View movie details</p>
            <p className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Find nearby theaters</p>
            <p className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Book seats</p>
            <p className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Manage bookings</p>
        </div>
        <p className='text-center mt-5'>This application is build using the mern stack:</p>
    </div>
    </div>
  )
}

export default About