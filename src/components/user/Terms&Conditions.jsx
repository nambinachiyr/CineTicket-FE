import React from 'react'
import close from '.../../../src/assets/close (1).png'

const Term_Conditions = ({setIsT_C}) => {
    function handleClose(){
       setIsT_C(false)
    }
  return (
    <div  className={` fixed inset-0 duration-300 transition-all rounded-4xl z-50 bg-black/40 backdrop-blur-md ` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-3 top-4 w-5' src={close} alt="" />
    <div className='text-xs mx-auto border tracking-wide border-white/40 flex text-white flex-col max-w-lg text-center md:h-full h-[100vh] bg-[#111722]  justify-between items-center rounded-4xl md:p-6 gap-2 md:gap-0 font-normal'>
        <h1 className='font-bold sm:tsxt-2xl tracking-[0.12em] text-xs md:font-semibold md:text-xl text-center'>Terms & Conditions</h1>
        <p className='className="mt-3 max-w-xl text-sm leading-6 text-gray-400 px-2 sm:text-base sm:leading-7"'>Wecome to <span className='text-red-500'>Cine Tickets.</span>By using our application, you agree to the following terms.</p>
        <div className='pl-4 lg:text-lg text-sm font-semibold text-center '>Information we collect
            <p className='mt-6 lg:text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2'>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>Ticket Booking</span>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>Payments</span>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>Cancellation</span>  
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>User Account</span>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>Changes</span>
            </p>
                      
        </div>
        <div className='text-center md:text-[16px] border-b border-dashed pb-5'>
           Thank you for Using Cine Ticket
        </div>
    </div>
    </div>
  )
}

export default Term_Conditions