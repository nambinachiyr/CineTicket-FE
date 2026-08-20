import React, { useContext, useState } from 'react'
import close from "../../assets/close (1).png"
import { contextValue } from '../../contextvaluses/ContextValue'
import My_BookingOrder from './my-BookingOrder';
import upArrow from '../../assets/up-arrow.png'
import setting from"../../assets/settings.png"
import authInstance from '../../axioInstances/user/authInstances';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RightSideBar = ({setOpenSideBar,openSideBar}) => {
    const {contextUser,setContextUser,setContextEmail} = useContext(contextValue)
    const [openOrders,setOpenOrders] = useState(false)
    const [mss,setMsg] = useState('')
    const navi = useNavigate()

    async function handleLogOut() {
        try{
           const response = await authInstance.post('/logout')
           console.log(response?.data?.message)
           toast.success(response?.data?.message)
           setContextEmail('')
           setContextUser('')
        //    setTimeout(()=>{
               setOpenSideBar(false)
        //    },500)
           
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${openSideBar?"opacity-100":"pointer-events-none opacity-0"} `}>
    <div className={`fixed top-15 right-0 shadow-2xl flex flex-col gap-5 h-screen text-lg p-2 bg-[#0b0f17] my-auto transition-transform rounded-2xl z-60 ${openSideBar?"translate-x-0":"translate-x-full"} translate-x-0 overflow-y-auto w-80 md:w-85 border border-red-600`}>

        <div className='flex justify-start'>
            <img onClick={()=>setOpenSideBar(false)} className='hover:cursor-pointer bg-white/5 hover:bg-white/10 w-6'src={close} alt="" />
        </div>
        
        <div className='text-gray-400 '><p>😊Hi, Welcome,🥳</p> <span className='text-white mt-1 text-lg'>{contextUser.name}</span></div>
         <div className='flex gap-3 items-start mt-8 flex-col '>
            <p className='flex gap-4 justify-center items-center'><span>Your Orders</span>{ openOrders ? <img onClick={()=>setOpenOrders(prev=>!prev)} className='text-xl hover:shadow-2xl bg-gray-100 rounded-full w-5 h-5 px-1 py-1 text-center hover:border hover:cursor-pointer  hover:border-white/50' src={upArrow} alt="" />:<span onClick={()=>setOpenOrders(true)} className='text-xl hover:shadow-2xl hover:bg-gray-100 rounded-full w-5 h-5 bg-gray-500 mt-1 text-center hover:border hover:text-black hover:cursor-pointer  hover:border-white/60'>⏷</span>}
</p>
            
                {
                    openOrders&&<My_BookingOrder/>
                }
            
         </div>
         {/* <div className='flex gap-2 items-center'>
         </div> */}
         <div className='flex justify-center items-center'>
            <button onClick={handleLogOut} className='border px-3 py-1 rounded-lg bg-red-600 text-white border-olive-400 shadow hover:cursor-pointer hover:shadow-2xl'>Log Out</button>
         </div>
         
    </div>
    </div>
  )
}

export default RightSideBar