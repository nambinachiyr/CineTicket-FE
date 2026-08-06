import React from 'react'
import close from '.../../../src/assets/close (1).png'

const PrivacyPolicy = ({setIsPrivacy}) => {
    function handleClose(){
       setIsPrivacy(false)
    }
  return (
    <div  className={` absolute inset-0 duration-300 transition-all rounded-4xl  md:w-[90%] h-[90%] mx-auto my-auto z-50 bg-black/40 backdrop-blur-md ` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-3 top-4 w-5' src={close} alt="" />
    <div className='text-xs mx-auto border-4 flex text-yellow-700 flex-col w-[85%] h-[98%] md:h-full bg-yellow-200 justify-center items-center rounded-4xl md:rounded-full  md:p-6 gap-2 md:gap-0 font-normal'>
        <h1 className='font-bold text-xs md:font-semibold md:text-xl text-center'>Privacy Policy</h1>
        {/* <p className='text-center'>We only collect the information necessary to provide our movie ticket booking services.</p> */}
        <div className='pl-4 lg:text-lg md:text-sm font-semibold md:text-center'>Information we collect
            <p className='grid grid-cols-2 font-light md:text-[16px] md:grid-cols-3 md:gap-0'>
            <span>• Name</span>
            <span>• Email Address</span>
            <span>• Booking Details</span>  
            </p>
                      
        </div>
        <div className='text-center md:text-[16px] border-b border-dashed pb-5'>
            <p>How we use your information </p>
            <div className='grid md:text-[14px] md:grid-cols-2 lg:grid-cols-3'>
                <span>• To create your account </span>
                <span>• To manage your bokkings </span>
                <span>• To improve user experience</span>
            </div>
        </div>
        
    <p >Last Updated: July 2026</p>
    </div>
    </div>
  )
}

export default PrivacyPolicy