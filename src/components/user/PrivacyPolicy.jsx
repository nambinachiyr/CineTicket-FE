import React from 'react'
import close from '.../../../src/assets/close (1).png'

const PrivacyPolicy = ({setIsPrivacy}) => {
    function handleClose(){
       setIsPrivacy(false)
    }
  return (
    <div  className={` fixed inset-0  rounded-2xl w-full z-50 bg-black/40 backdrop-blur-lg` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-3 top-4 w-5' src={close} alt="" />
    <div className='text-xs mx-auto border tracking-wide py-8 border-white/40 flex text-white flex-col max-w-lg text-center md:h-full h-[100vh] bg-[#111722]  justify-between items-center rounded-xl md:p-6 gap-2 md:gap-0 font-normal'>
        <h1 className='font-bold sm:tsxt-2xl tracking-[0.12em] text-xs md:font-semibold md:text-xl text-center'>Privacy Policy</h1>
        <p  className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">We only collect the information necessary to provide our movie ticket booking services.</p>
        <div className='pl-4 lg:text-lg md:text-sm font-semibold md:text-center'>Information we collect
            <p className='mt-6 lg:text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2'>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Name</span>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Email Address</span>
            <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• Booking Details</span>  
            </p>
                      
        </div>
        <div className='text-center md:text-[16px] border-b border-dashed pb-5'>
            <p className='pl-4 lg:text-lg md:text-sm font-semibold md:text-center py-2'>How we use your information </p>
            <div className='grid md:text-[14px] grid-cols-2 gap-3 lg:grid-cols-3'>
                <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• To create your account </span>
                <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• To manage your bokkings </span>
                <span className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>• To improve user experience</span>
            </div>
        </div>
        
    <p >Last Updated: July 2026</p>
    </div>
    </div>
  )
}

export default PrivacyPolicy