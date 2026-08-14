
import ticketLogo from ".../../../src/assets/ticket1.png"
import searchI from ".../../../src/assets/search.png"
import contact from ".../../../src/assets/contact.png"
import { useContext, useState } from "react"
import { contextValue } from "../../contextvaluses/ContextValue"
import RightSideBar from "./RightSideBar"
import { useNavigate } from "react-router-dom"
import MovieInstance from "../../axioInstances/user/movieInstance"

const NavBar = () => {
    const navi = useNavigate()
    const [search,setSearch] = useState('')
    const { contextMovieError,
        setContextMovieError,
        contextMovieLoad,
        setContextMovieLoad, 
        isContextSearch,
        setIsContextSearch, 
        contextMovieData,
        setContextMovieData, 
        contextEmail, 
        contextUser,
        contextSearchMovie,
        setContextSearchMovie } = useContext(contextValue)

    const [openSideBar,setOpenSideBar] = useState(false)
    console.log(contextEmail)
    
    const profileName = contextEmail.charAt(0).toUpperCase() || ""

    const handleSearchMovie = async () => {
        setIsContextSearch(true)
        try {
            setContextMovieError('')
            setContextMovieData([])
            setContextMovieLoad(true)
            console.log(search)
            const response = await MovieInstance.get(`/search?title=${search}`)
            console.log(response?.data?.movie)
            setContextMovieData(response?.data?.movie)
            setContextSearchMovie(search)
        } catch (err) {
            setContextMovieError(err.response?.data?.message)
        }
        finally{
            setContextMovieLoad(false)
            setSearch('')
            
        }
    }

    function handleProfile(){
       setOpenSideBar(true)
    }

    return (
        <div className="bg-[#0f0f0f] border-b border-gray-800 px-4 py-4 md:px-8 md:py-5">
           {openSideBar&&<RightSideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>}
            <div className="flex justify-between items-center max-w-7xl mx-auto px-1 ">
                <h1>
                    <img src={ticketLogo} alt="Ticket Logo" className="w-10 h-12 md:w-12 lg:w-22 lg:h-18 object-contain " />
                </h1>
                <h1 className="text-white font-black text-xl lg:text-3xl">Cine <span className="text-red-500">Tickets</span></h1>
                <p onClick={contextEmail?handleProfile:()=>navi('/login')} className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 border hover:cursor-pointer rounded-full text-md font-bold text-white flex justify-center items-center bg-[#1c1c1c]">{contextEmail ? profileName : <img src={contact} alt=" " className="w-6 lg:w-8" />}</p>
            </div>
            <div className="border w-3/4 lg:w-1/2 h-7 md:h-8 lg:h-11 mx-auto px-1 border-gray-700 bg-transparent py-1 rounded-sm flex items-center justify-between">
                <input type="text" onKeyDown={(e)=>{if(e.key === "Enter"){handleSearchMovie()}}}  value={search} onChange={(e)=>setSearch(e.target.value)} className="focus:outline-none text-sm placeholder:text-gray-500 text-white w-full md:text-lg bg-black/40 lg:text-xl" />
                <button type="button"  onClick={handleSearchMovie} className="flex items-center rounded-md hover:bg-gray-300 px-2 py-1 hover:cursor-pointer group">
                    <span className="text-xs text-gray-400 lg:text-sm">search</span>
                </button>
            </div>

        </div>
    )
}

export default NavBar