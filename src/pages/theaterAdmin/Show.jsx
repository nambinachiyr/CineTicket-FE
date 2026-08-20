import React, { useEffect, useState } from 'react'
import showInstance from '../../axioInstances/theaterAdmin/showInstance'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import edit from "../../assets/pencils.png"
import theaterInstance from '../../axioInstances/theaterAdmin/theaterAdminDash'
import toast from 'react-hot-toast'
import bin from "../../assets/bin.png"
import close from "../../assets/close (1).png"
import LoadSpinButton from "../../components/user/LoadSpinButton"

const Show = () => {
    const showData = useLoaderData()
    const { revalidate } = useRevalidator()
    console.log(showData)
    const [editId, setEditId] = useState('')
    const [editData, setEditData] = useState(null)
    const [screens, setScreens] = useState([])
    const [load ,setLoad] = useState(false)
    const navi = useNavigate()

    const lang = {
        ta: "Tamil",
        en: "English",
        hi: "Hindi",
        ml: "Malayalam",
        te: "Telugu",
        kn: "Kannada",
    }

    useEffect(() => {
        async function fetchingScreen() {
            try {
                
                const response = await theaterInstance.get('/allscreen')
                setScreens(response?.data?.screen)
            } catch (err) {
                console.log(err.message)
            }
           
        }
        fetchingScreen()
    }, [])
    console.log(screens)
    async function handleUpdateShow(s) {
        console.log(s)
        try {
            // console.log(editData.screen._id)
            setLoad(true)
            const updatedData = {
                screen: editData.screen._id|| s.screen._id,
                movie: editData.movie._id || s.movie._id,
                theater: editData.theater._id || s.theater._id,
                availableSeats: editData.availableSeats || s.availableSeats,
                bookedSeats: editData.bookedSeats || s.bookedSeats,
                price: editData.price || s.price,
                seats: editData.seats || s.seats,
                totalSeats: editData.totalSeats || s.totalSeats,
                bookingStatus: editData.bookingStatus || s.bookingStatus,
                showStatus: editData.showStatus || s.showStatus,
                showDate: editData.showDate || s.showDate,
                showTime: editData.showTime || s.showTime
            }
            console.log(updatedData)
            const response = await showInstance.put(`/${editId}/update`, { data: updatedData })
            // console.log(response?.data)
            toast.success(response?.data?.message)
            setEditData(null)
            setEditId('')
        
            revalidate()

        } catch (err) {
            console.log(err.response?.data,"Error")
            console.log(err.message,"err")
            toast.error(err.response?.data?.message)
        } finally{
                setLoad(false)
            }
    }
    console.log(editData)
    console.log(editId)
    async function handleDeleteShow(s) {
        try{
            const ok = window.confirm("are you sure to Delete")
            if(!ok) return ;
           const response = await showInstance.delete(`/${s?._id}/del`)
           console.log(response?.data?.message)
           toast.success(response?.data?.message)
        //  console.log("yes")
        }catch(err){
            console.log(err.response?.data?.message)
            toast.error(err.response?.data?.message)
        }
    }


    return (
        <div className='min-h-screen bg-[#070a10] px-4 py-6 text-white'>
            <img src={close} onClick={()=>navi(-1)} className='w-7 h-7 invert bg-white/10 p-1 border-white/50 self-end hover:scale-100 hover:cursor-pointer' alt='close' />
            {
                load?<div><LoadSpinButton/></div>:(
            <div className='flex flex-col justify-center items-center'>
                 <h1 className='text-lg uppercase tracking-[0.16em] text-gray-500 text-center'>Shows </h1>
            
              <div className='grid grid-cols-1 lg-grid-col-2'>
                {
                showData?.length > 0 ? (
                    showData?.map((s) => (
                        <div key={s?._id} className={`border w-[320px] relative bg-[#111722] flex border-white/10 ${showData.length>1?'lg:grid gird-cols-2':'grid grid-cols-1'} gap-3 md:text-xl md:w-[450px] p-3 self-cente rounded-xl mt-4 relative flex flex-col`}>
                            {
                                screens?.length > 0 && editId === s?._id ? (
                                    <div className='text-gray-600 flex flex-col gap-6'>
                                        <img onClick={(s)=>handleDeleteShow(s)} className='w-6 h-6 md:w-8 md:h-8 absolute top-2 right-2  shadow-olive-500 shadow-2xl hover:cursor-pointer hover:scale-95 transition-all duration-200' src={bin} alt="" />
                                            {
                                                s?.bookedSeats>0 ?
                                                <p><span>showStatus :</span>
                                                 <select value={editData?.showStatus } onChange={(e)=>setEditData({...editData,showStatus:e.target.value})}>
                                                    <option value="YetToStart">YetToStart</option>
                                                    <option value="Started">Started</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                 </select>
                                            </p> :
                                            
                                        <div className='flex flex-col gap-3'>
                                            <h1><span>ScreenName: </span>
                                                <select className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text"
                                                    value={editData?.screen?._id || s?.screen?._id}
                                                    onChange={(e) => {
                                                        console.log(s,"SCREEN")
                                                        const selectedScreen = screens.find(
                                                            screen => {
                                                                console.log(screen._id === e.target.value)
                                                                return screen._id === e.target.value
                                                            }
                                                        )
                                                        //   console.log(selectedScreen)
                                                        setEditData({ ...editData, screen: selectedScreen })
                                                    }} >
                                                    <option value='' disabled>Select Screen</option>
                                                    {

                                                        screens?.map(sr => (
                                                            <option key={sr._id} value={sr?._id}>{sr.name}</option>
                                                        ))
                                                    }
                                                </select></h1>
                                            <p><span>Movie:</span> <span>{s?.movie?.title}</span></p>
                                            <p><span>Language: </span>{lang[s?.movie?.original_language]}</p>
                                            <p><span>totalSeats :</span><span>{s?.totalSeats}</span></p>
                                            <p><span>availableSeats : </span><span>{s?.availableSeats}</span></p>
                                            <p><span>bookedSeats : </span><span>{s?.bookedSeats}</span></p>
                                            <p className='flex items-center'><span>bookingStatus :</span><span  className='ml-2'><input className='' type='radio' value={"Open"} name="bookingStatus" checked={editData?.bookingStatus === "Open"} onChange={(e) => setEditData({ ...editData, bookingStatus: e.target.value })} /> Open 
                                            <input className='ml-2' type='radio' value={"Closed"} name="bookingStatus" checked={editData?.bookingStatus === "Closed"} onChange={(e) => setEditData({ ...editData, bookingStatus: e.target.value })} /> Closed
                                            </span></p>

                                            <p><span>Price :</span><input type='number' value = {editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>
                                            <p><span>showDate :</span><input type= 'text' value = {editData.showDate} onChange={(e) => setEditData({ ...editData, showDate: e.target.value })} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>
                                            <p><span>showTime :</span><input type ='text' value = {editData.showTime} onChange={(e) => setEditData({ ...editData, showTime: e.target.value })} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>

                                            <p><span>showStatus :</span>
                                                 <select value={editData?.showStatus} onChange={(e)=>setEditData({...editData,showStatus:e.target.value})}>
                                                    <option value="YetToStart">YetToStart</option>
                                                    <option value="Started">Started</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                 </select>
                                            </p>
                                        </div>
}
                                        <div className='flex justify-end gap-4 '>
                                            <button onClick={() => {
                                                setEditId('')
                                                setEditData(null)
                                            }} className='border w-23 py-1 text-[17px] font-semibold rounded-sm hover:bg-white/15 hover:text-white hover:cursor-pointer'>Cancel</button>
                                            <button onClick={()=>handleUpdateShow(s)} className='border-white/10 text-white hover:bg-red-500/80 bg-red-500 w-23 py-1 text-[17px] font-semibold rounded-sm hover:cursor-pointer'>Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-1'>
                                        <h1><span>ScreenName: </span><span>{s?.screen?.name}</span></h1>
                                        <p><span>Movie:</span> <span>{s?.movie?.title}</span></p>
                                        <p><span>Language: </span>{lang[s?.movie?.original_language]}</p>
                                        <p><span>totalSeats :</span><span>{s?.totalSeats}</span></p>
                                        <p><span>availableSeats : </span><span>{s?.availableSeats}</span></p>
                                        <p><span>bookedSeats : </span><span>{s?.bookedSeats}</span></p>
                                        <p><span>bookingStatus :</span><span>{s?.bookingStatus}</span></p>
                                        <p><span>Price :</span><span>{s?.price}</span></p>
                                        <p><span>showDate :</span><span>{s?.showDate}</span></p>
                                        <p><span>showTime :</span><span>{s?.showTime}</span></p>
                                        <p><span>showStatus :</span><span>{s?.showStatus}</span></p>
                                        <button
                                            onClick={() => {
                                                setEditId(s?._id)
                                                setEditData(s)
                                            }} className=' ml-auto'><img className='w-6  hover:shadow-olive-50 hover:shadow-2xl hover:scale-110 hover:cursor-pointer' src={edit} alt="" /></button>
                                     
                                    </div>
                                )}
                        </div>
                    ))
                ) : (<p>No Shows</p>)
            }
            </div>
            
            </div>)}
        </div>
    )
}

export default Show