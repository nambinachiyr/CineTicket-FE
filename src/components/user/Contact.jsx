import React from 'react'
import close from '.../../../src/assets/close (1).png'

const Contact = ({setIsContact}) => {
    function handleClose(){
       setIsContact(false)
    }
  return (
    <div className={` fixed inset-0 duration-300 transition-all rounded-4xl  px-4 py-6 flex justify-center items-center z-50 bg-black/70 backdrop-blur-sm ` }>
    <img onClick={handleClose} className='hover:cursor-pointer rounded-full bg-white/10 absolute right-4 top-4 w-5' src={close} alt="" />
    <div className='flex flex-col max-w-lg h-[95%] md:h-full bg-[#111722] shadow-[0_24px_80px_rgba(0,0,0,0.6)] justify-center rounded-4xl  p-6 gap-2 text-sm font-normal'>
        <h1 className='md:text-2xl font-semibold text-xl text-center'>Contact Us-</h1>
        <p className='md:text-xl'>We'd love to hear from you! Feel Free to reach out if you have any questions,suggestions,or feedback</p>
        <p className='text-sm text-center md:text-lg'>📧 <span className='text-[12px]'>Email :</span> support@cinetickets.com</p>
    </div>
    </div>
  )
}

export default Contact
