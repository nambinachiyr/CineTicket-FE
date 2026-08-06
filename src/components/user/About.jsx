import React from 'react'
import close from '.../../../src/assets/close (1).png'

const About = ({setIsAbout}) => {
    function handleClose(){
       setIsAbout(false)
    }
  return (
    <div  className={` absolute inset-0 duration-300 transition-all rounded-4xl w-[80%] h-[90%]  flex justify-center items-center mx-auto my-auto z-50 bg-black/40 backdrop-blur-md ` }>
    <img onClick={handleClose} className='hover:cursor-pointer absolute right-4 top-4 w-5' src={close} alt="" />
    <div className='flex text-yellow-700 flex-col w-[80%] h-[95%] md:h-full bg-yellow-200 border justify-end rounded-4xl md:rounded-full  p-6 gap-2 text-sm font-normal'>
        <h1 className='font-bold md:font-semibold md:text-xl text-center'>About Cine Tickets</h1>
        <div className='pl-4 lg:text-lg grid md:grid-cols-2 lg:grid-cols-3 md:gap-2'>
            <p>• Browse movies</p>
            <p>• View movie details</p>
            <p>• Find nearby theaters</p>
            <p>• Book seats</p>
            <p>• Manage bookings</p>
        </div>
        <p className='text-center'>This application is build using the mern stack:</p>
    </div>
    </div>
  )
}

export default About