import React from 'react'
import close from '.../../../src/assets/close (1).png'

const Contact = ({setIsContact}) => {
    function handleClose(){
       setIsContact(false)
    }
  return (
    <div className={` absolute inset-0 duration-300 transition-all rounded-4xl w-[80%] h-[90%]  flex justify-center items-center mx-auto my-auto z-50 bg-black/40 backdrop-blur-md ` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-4 top-4 w-5' src={close} alt="" />
    <div className='flex text-yellow-700 flex-col w-[80%] h-[95%] md:h-full bg-yellow-200 border justify-center rounded-4xl  p-6 gap-2 text-sm font-normal'>
        <h1 className='md:text-2xl font-semibold text-xl text-center'>Contact Us-</h1>
        <p className='md:text-xl'>We'd love to hear from you! Feel Free to reach out if you have any questions,suggestions,or feedback</p>
        <p className='text-sm text-center md:text-lg'>📧 <span className='text-[12px]'>Email :</span> support@cinetickets.com</p>
    </div>
    </div>
  )
}

export default Contact
