import React, { useState } from 'react'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import close from "../../assets/close (1).png"
import edit from "../../assets/pencils.png"
import theaterInstance from '../../axioInstances/theaterAdmin/theaterInstance'
import toast from 'react-hot-toast'

const Theater = () => {
  const theaterData = useLoaderData()
  console.log(theaterData)
  const [editId,setEditId] = useState('')
  const [editData,setEditData] = useState(null)
  const navi = useNavigate()
  const {revalidate} = useRevalidator()
  const [loading,setLoading] = useState(false)
  const [msg,setMsg] = useState('')

  async function handleUpdateTheater() {
    try{
      setLoading(true)
      const updatedData = {
        name:editData?.name,
        address:editData?.address,
        cityId:editData?.city?._id,
        stateId:editData?.state?._id,
        isActive:editData?.isActive
      }
      console.log(editData.isActive,typeof editData.isActive)
       const response = await theaterInstance.put(`/update/${editId}`,updatedData)
       console.log(response?.data?.updatedTheater)
       toast.success(response?.data?.message)
       
       setEditData(null)
       setEditId('')
       revalidate()
    }catch(err){
      setMsg(err.response?.data?.message)
      toast.error(err.response?.data?.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col md:text-xl gap-7 bg-[#070a10] text-white justify-center md:gap-10 p-5  min-h-screen m-1 rounded-lg'>
      <img onClick={() => navi(-1)} className='w-7 h-7 self-end hover:cursor-pointer' src={close} alt="" />
      <h1 className='text-3xl self-center text-gray-600'>Theater Detail</h1>
      <div key={theaterData?._id} className={`border border-white/10 rounded-xl bg-[#111722] p-3 md:w-130 self-center ${theaterData?.isActive ? 'border-green-500 border-dashed' :editId? 'border-blue-500 bg-gray-100 border-dashed' : theaterData?.isActive === false ? ' border-red-500 ' : ""} p-2 flex flex-col gap-1`}>

          {
            editId && editData ? <div className='flex flex-col gap-4 tracking-wider'>
              <h1><span>Theater Name : </span><input  type="text"  value={editData?.name} onChange={(e)=>setEditData({...editData,name:e.target.value})} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1'/></h1>
          <p><span>Address : </span><input  type="text"  value={editData?.address} onChange={(e)=>setEditData({...editData,address:e.target.value})} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1'/></p>
          <p><span>Active : </span><input type='radio' value={true} name='isActive' checked = {editData.isActive === true} onChange={(e)=>setEditData({...editData,isActive:true})}/>Yes <input type='radio' value={false} name='isActive' checked = {editData.isActive === false} onChange={(e)=>setEditData({...editData,isActive:false})}/> No</p>
          <div className='flex justify-end gap-4 '>
                                    <button onClick={()=>{
                                        setEditId('')
                                        setEditData(null)
                                    }} className='border w-23 py-1 text-[17px] font-semibold border-white/12 bg-white/10 hover:bg-white/15 rounded-xl hover:cursor-pointer'>Cancel</button>
                                    <button onClick={handleUpdateTheater} className='border w-23 py-1 text-[17px] font-semibold rounded-xl border-white/10 bg-red-500 hover:bg-red-600 hover:cursor-pointer'>Save</button>
                                </div>
            </div>
          :
<div className='flex flex-col gap-4 tracking-wider'>
          <h1>TheaterName : {theaterData?.name}</h1>
          <p>Address : {theaterData?.address}</p>
          <p>CityName : {theaterData?.city?.name?.split('')[0].toUpperCase()}{theaterData?.city?.name?.slice(1,)}</p>
          <p>StateName : {theaterData?.state?.name?.split('')[0].toUpperCase()}{theaterData?.state?.name?.slice(1,)}</p>
          <img onClick={()=>{
            setEditId(theaterData._id)
            setEditData(theaterData)
          }} className='w-5 h-5 self-end hover:cursor-pointer hover:scale-100' src={edit} alt="" />
        </div>
        }
      </div>

    </div>
      )
}

      export default Theater