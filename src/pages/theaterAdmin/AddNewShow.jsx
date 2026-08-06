import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import theaterAdminInstance from '../../axioInstances/theaterAdmin/theaterAdminDash'
import toast from 'react-hot-toast'
import screenInstance from '../../axioInstances/theaterAdmin/screenInstance'
import theaterInstance from '../../axioInstances/theaterAdmin/theaterInstance'
import movieInstance from '../../axioInstances/theaterAdmin/movieInstance'
import close from "../../assets/close (1).png"
import search from "../../assets/search.png"

const AddNewShow = () => {

    const navi = useNavigate()
    const [screen, setScreen] = useState('')
    const [movie,setMovie] = useState('')
    const [showD,setShowD] = useState('')
    const [showT,setShowT] = useState('')
    const [price,setPrice] = useState('')
    const [screens,setScreens] = useState([])
    const [movies,setMovies] = useState([])
    const [searchMovie,setSearchMovie] = useState('')
    const [selectedMovie,setSelectedMovie] = useState(null)
    const [msg,setMsg] = useState('')
    
  console.log(typeof screen) //string
  const filteredMovies = movies?.filter((m)=>
        m.title.toLowerCase().includes(searchMovie.toLowerCase())
    )
    async function handleCreateShow() {
        console.log(movie,"M",screen,"S",price,"P",showD,"D",showT,"T")
        if(!movie || !screen || !price || !showD || !showT){
            return setMsg("fill all required !")
        }

        try {
            setMsg('')
           console.log("Run")
            const response = await theaterAdminInstance.post('/create/show', { screen:screen,movie:movie,showDate:(showD.split('-').reverse().join('-')),showTime:showT,price:price, })
            console.log(response?.data)
            console.log("Runing")
            toast.success(response?.data?.message)  
            setMovie('')
            setScreen('')
            setPrice('')
            setShowD('')
            setShowT('')         
            setSearchMovie('')
            setSelectedMovie('')
            // revalidate()

        } catch (err) {
             
            console.log(err.message)
            toast.error(err.response?.data?.message)
        }
    }

    useEffect(() => {
        async function fetchingScreen() {
           
            try {
                const response = await theaterAdminInstance.get('/allScreen')
                setScreens(response?.data.screen)
            } catch (err) {
                console.log(err.message)
            }
        }        
        
        async function fetchMovies() {
            try{
                const response = await movieInstance.get('/allMovies')
                console.log(response?.data?.movies?.length)
                setMovies(response?.data?.movies)
            }catch(err){
                console.log(err.response?.data)
            }
        }
        fetchMovies()
        fetchingScreen()
    },[])
    
    // console.log(screens)
    // console.log(screen)
    // console.log(selectedMovie,"SELECT M")
    // console.log(showD.split('-').reverse().join('-'))
    
    console.log(filteredMovies)
    return (
        <div className='flex flex-col md:text-xl gap-7 justify-center md:gap-10 p-5 bg-[#e6f2f7] min-h-screen m-1 rounded-lg'>
            <img onClick={() => navi(-1)} className='w-7 h-7 self-end hover:cursor-pointer' src={close} alt="" />
            <h1 className='text-3xl self-center text-gray-600'>Create New Shows</h1>

            <div className='flex flex-col gap-3'>
                <h1><span>ScreenName: </span>
                    <select className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text"
                        value={screen || ''} 
                        onChange={(e) => {
                            const selectedScreen = screens.find(
                                screen => {
                                    // console.log(screen._id === e.target.value)
                                    return screen._id === e.target.value
                                }
                            )
                              console.log(selectedScreen,"SS")
                            if(selectedScreen){
                                setScreen(selectedScreen._id)
                            }
                        }} >
                        <option value='' disabled>Select Screen</option>
                        {

                            screens?.map(sr => (
                                <option key={sr._id} value={sr?._id}>{sr.name}</option>
                            ))
                        }
                    </select></h1>
                <p><span>Movie:</span> <span></span></p>
                <p className='border flex items-center justify-between w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1'>
                    <input className='focus:outline-none' type="text" value={searchMovie} onChange={(e)=>setSearchMovie(e.target.value)} placeholder='Search Movie...' />
                {/* <img src={search} className='w-7 h-7 ' alt="" /> */}
                </p>
                {
                    searchMovie&&filteredMovies.length>0&&
                    <div className='border bg-gray-50 flex flex-col gap-2 text-lg font-semibold px-4 py-2 border-gray-400 shadow-2xl text-gray-700 tracking-wide shadow-olive-400'>
                    {                 
                    
                        filteredMovies?.map((m)=>(
                             <p onClick={()=>{setSelectedMovie(m)
                                setSearchMovie(m.title)
                                setMovie(m._id)
                             }}>{m?.title}</p>
                        ))
                    }
                 </div>
                }
                

                <p><span>Price :</span><input type='number' value={price} onChange={(e) => setPrice(e.target.value )} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>
                <p><span>showDate :</span><input type='date' value={showD} onChange={(e) => setShowD(e.target.value )} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>
                <p><span>showTime :</span><input type='time' value={showT} onChange={(e) => setShowT(e.target.value )} className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' /></p>
            </div>
            <p className='text-center text-red-500 text-xl font-semibold tracking-wide'>{msg? msg:""}</p>
            <div className='flex justify-end gap-4 '>
                <button onClick={() => {
                    setPrice('')
                    setScreen('')
                    setMovie('')
                    setShowD('')
                    setShowT('')
                    setSearchMovie('')
                    setSelectedMovie('')
                    setMsg('')
                }} className='border w-23 py-1 text-[17px] font-semibold rounded-sm hover:shadow-2xl shadow-olive-200 hover:cursor-pointer'>Cancel</button>
                <button onClick={handleCreateShow} className='border w-23 py-1 text-[17px] font-semibold rounded-sm hover:shadow-2xl shadow-olive-200 hover:cursor-pointer'>Create</button>
            </div>
        </div>
 
  )
}

export default AddNewShow