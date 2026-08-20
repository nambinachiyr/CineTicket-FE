import React, { useState } from 'react'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import edit from "../../assets/pencils.png"
import screenInstance from '../../axioInstances/theaterAdmin/screenInstance'
import close from "../../assets/close (1).png"

const Screen = () => {
    const screenData = useLoaderData()
    const {revalidate} = useRevalidator()
    const navi = useNavigate()
    console.log(screenData)
    const [editId,setEditId] = useState('')
    const [editData,setEditData] = useState(null)
    const [load,setLoad] = useState(false)
   
    async function handleUpdateScreen(){
        try{
            setLoad(true)
           const response = await screenInstance.put(`/${editId}/update`,{data:editData})
           console.log(response?.data)
           setEditData(null)
           setEditId('')

           revalidate()

        }catch(err){
            console.log(err.message)
        }
    }

  return (
    <div className=' text-white p-5 bg-[#070a10] min-h-screen px-4 py-6'>
        <img onClick={()=>navi(-1)} className='w-7 px-1 py-1 h-7 rounded-2xl hover:bg-gray-700 border border-white/10  bg-white/10 self-end hover:cursor-pointer' src={close} alt="" />
        <h1 className='text-xl text-center font-bold uppercase  tracking-[0.15em] text-gray-300 my-4'>Screens</h1>
        <div className='mt-6 flex flex-col gap-4'>
        {
            screenData?.length>0?(
                screenData?.map((s)=>(
                    <div key={s?._id} className={`border-2 w-[80%] md:w-[50%] lg:[30%] self-center ${s?.isActive && editId !== s._id?'border-green-500 border-dashed':'border-blue-500 bg-gray-100 border-dashed'} ${s.isActive===false?' border-red-500 ':""} p-2 flex flex-col gap-1`}>
                    {
                        editId === s?._id?(
                            <div className='text-gray-600 flex flex-col gap-6'>
                                <div className='grid grid-cols-2 gap-3'>
                                    <h1><span className='mb-1 block text-xs text-gray-500'>Name: </span><input className='border w-full focus:outline-none  bg-[#0b0f17] border-white/10 px-3  text-white py-2.5 focus-within:border-red-500/60' type="text" value={editData.name} onChange={(e)=>setEditData({...editData,name:e.target.value})}/></h1>
                                <p><span className='mb-1 block text-xs text-gray-500'>ScreenSystem: </span> <input className='border w-full focus:outline-none  bg-[#0b0f17] border-white/10 px-3  text-white py-2.5 focus-within:border-red-500/60' type="text" value={editData.screenSystem} onChange={(e)=>setEditData({...editData,screenSystem:e.target.value})} /></p>
                                <p><span className='mb-1 block text-xs text-gray-500'>SoundSystem: </span> <input className='border w-full focus:outline-none  bg-[#0b0f17] border-white/10 px-3  text-white py-2.5 focus-within:border-red-500/60' type="text" value={editData.soundSystem} onChange={(e)=>setEditData({...editData,soundSystem:e.target.value})} /></p>
                                <p><span className='mb-1 block text-xs text-gray-500'>Number of Seats: </span> <input className='border w-full focus:outline-none  bg-[#0b0f17]  border-white/10 px-3  text-white py-2.5 focus-within:border-red-500/60' type="Number" value={editData.numberOfSeats} onChange={(e)=>setEditData({...editData,numberOfSeats:Number(e.target.value)})} /></p>
                                <div>
                                    <p className='mb-1 block text-xs text-gray-500'>isActive</p>
                                    <p><input type="radio" value={true} name = "isActive" checked={editData.isActive === true } onChange={(e)=>setEditData({...editData,isActive:true})}  /> Yes</p><p><input type="radio" value={false} name="isActive" checked={editData.isActive === false } onChange={(e)=>setEditData({...editData,isActive:false})}/> No</p>
                                </div>
                                </div>
                                <div className='flex justify-end gap-4 '>
                                    <button onClick={()=>{
                                        setEditId('')
                                        setEditData(null)
                                    }} className='border w-23 py-1 text-[17px] font-semibold rounded-lg border-white/10 hover:bg-gray-300 hover:cursor-pointer'>Cancel</button>
                                    <button onClick={handleUpdateScreen} className='border w-23 py-1 text-[17px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer'>Save</button>
                                </div>
                            </div>
                        ):(
                       <>
                        <h1><span>Name: </span><span>{s?.name}</span></h1>
                        <p><span>ScreenSystem:</span> <span>{s?.screenSystem}</span></p>
                        <p><span>SoundSytem: </span>{s?.soundSystem}</p>
                        <p><span>Number of Seats : </span><span>{s?.numberOfSeats}</span></p>
                        <button 
                        onClick={()=>{
                            setEditId(s?._id)
                             setEditData(s)}} className='self-end'><img className='w-6 hover:shadow-olive-50 hover:shadow-2xl' src={edit} alt="" /></button>
</>
                            )}
                    </div>
                ))
            ):(<p>No Screens</p>)
        }
        </div>
    </div>
  )
}

export default Screen