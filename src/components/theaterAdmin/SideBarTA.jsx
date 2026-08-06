import React, { useState } from 'react'
import screenInstance from '../../axioInstances/theaterAdmin/screenInstance'
import close from "../../assets/close (1).png"
import { useNavigate } from 'react-router-dom'
import add from "../../assets/magic.png"
const SideBarTA = ({data,setOpenSideBar}) => {
    console.log(data)
    const navi = useNavigate()   

  return (
    <div className='fixed text-[17px] rounded-tl-3xl  rounded-br-3xl md:text-2xl flex flex-col gap-5 md:gap-10 p-4 top-35 left-5 w-50 md:w-59 md:h-[50%] h-70 bg-yellow-100'>
        <img onClick={()=>setOpenSideBar(false)} className='w-7 h-7 top-1 right-1 block md:hidden absolute hover:cursor-pointer' src={close} alt="" />
        <p onClick={()=>navi('/theater-admin/theater')} className='hover:text-blue-500 mt-2 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>
            <span>Theater</span>
        </p>
        <p  className='flex flex-row-reverse justify-between'>
            <img className='hover:cursor-pointer hover:scale-x-75 hover:border-amber-500 transition-all ' onClick={()=>navi('/theater-admin/addscreen')} src={add} alt="" />
            <span className='hover:text-blue-500 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer' onClick={()=>navi('/theater-admin/screens')}>Screens</span>
        </p>
        <p   className='flex flex-row-reverse justify-between'>
                        <img className='hover:cursor-pointer hover:scale-x-75 hover:border-amber-500 transition-all ' onClick={()=>navi('/theater-admin/addshow')} src={add} alt="" />

            <span onClick={()=>navi('/theater-admin/shows')} className='hover:text-blue-500 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>Shows</span>
        </p>
        <p className='hover:text-blue-500 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>
            <span>Running Movies</span>
        </p>
        <p >
            <span></span>
        </p>
    
    </div>
  )
}

export default SideBarTA