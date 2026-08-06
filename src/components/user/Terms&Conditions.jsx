import React from 'react'
import close from '.../../../src/assets/close (1).png'

const Term_Conditions = ({setIsT_C}) => {
    function handleClose(){
       setIsT_C(false)
    }
  return (
    <div  className={` absolute inset-0 duration-300 transition-all rounded-4xl  md:w-[90%] h-[90%] mx-auto my-auto z-50 bg-black/40 backdrop-blur-md ` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-3 top-4 w-5' src={close} alt="" />
    <div className='text-xs mx-auto border-4 flex text-yellow-700 flex-col w-[85%] h-[98%] md:h-full bg-yellow-200 justify-center items-center rounded-4xl md:rounded-full  md:p-6 gap-2 md:gap-0 font-normal'>
        <h1 className='font-bold text-xs md:font-semibold md:text-xl text-center'>Terms & Conditions</h1>
        <p className='text-center'>Wecome to <span className='text-black'>Cine Tickets.</span>By using our application, you agree to the following terms.</p>
        <div className='pl-4 lg:text-lg md:text-sm font-semibold md:text-center'>Information we collect
            <p className='grid grid-cols-2 font-light md:text-[16px] md:grid-cols-3 md:gap-0'>
            <span>Ticket Booking</span>
            <span>Payments</span>
            <span>Cancellation</span>  
            <span>User Account</span>
            <span>Changes</span>
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