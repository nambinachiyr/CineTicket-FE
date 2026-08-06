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
   
    async function handleUpdateScreen(){
        try{
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
    <div className='flex flex-col md:text-xl gap-7 justify-center md:gap-10 p-5 bg-[#e6f2f7] min-h-screen m-1 rounded-lg'>
        <img onClick={()=>navi(-1)} className='w-7 h-7 self-end hover:cursor-pointer' src={close} alt="" />
        <h1 className='text-3xl self-center text-gray-600'>All Screens Available here</h1>
        {
            screenData?.length>0?(
                screenData?.map((s)=>(
                    <div key={s?._id} className={`border-2 md:w-130 self-center ${s?.isActive && editId !== s._id?'border-green-500 border-dashed':'border-blue-500 bg-gray-100 border-dashed'} ${s.isActive===false?' border-red-500 ':""} p-2 flex flex-col gap-1`}>
                    {
                        editId === s?._id?(
                            <div className='text-gray-600 flex flex-col gap-6'>
                                <div className='flex flex-col gap-3'>
                                    <h1><span>Name: </span><input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={editData.name} onChange={(e)=>setEditData({...editData,name:e.target.value})}/></h1>
                                <p><span>ScreenSystem: </span> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={editData.screenSystem} onChange={(e)=>setEditData({...editData,screenSystem:e.target.value})} /></p>
                                <p><span>SoundSystem: </span> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={editData.soundSystem} onChange={(e)=>setEditData({...editData,soundSystem:e.target.value})} /></p>
                                <p><span>Number of Seats: </span> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="Number" value={editData.numberOfSeats} onChange={(e)=>setEditData({...editData,numberOfSeats:Number(e.target.value)})} /></p>
                                <div>
                                    <p>isActive</p>
                                    <p><input type="radio" value={true} name = "isActive" checked={editData.isActive === true } onChange={(e)=>setEditData({...editData,isActive:true})}  /> Yes</p><p><input type="radio" value={false} name="isActive" checked={editData.isActive === false } onChange={(e)=>setEditData({...editData,isActive:false})}/> No</p>
                                </div>
                                </div>
                                <div className='flex justify-end gap-4 '>
                                    <button onClick={()=>{
                                        setEditId('')
                                        setEditData(null)
                                    }} className='border w-23 py-1 text-[17px] font-semibold rounded-sm hover:shadow-2xl shadow-olive-200 hover:cursor-pointer'>Cancel</button>
                                    <button onClick={handleUpdateScreen} className='border w-23 py-1 text-[17px] font-semibold rounded-sm hover:shadow-2xl shadow-olive-200 hover:cursor-pointer'>Save</button>
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
  )
}

export default Screen