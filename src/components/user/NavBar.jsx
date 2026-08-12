
import ticketLogo from ".../../../src/assets/ticket1.png"
import searchI from ".../../../src/assets/search.png"
import contact from ".../../../src/assets/contact.png"
import { useContext, useEffect, useState } from "react"
import authInstance from "../../axioInstances/user/authInstances"
import { contextValue } from "../../contextvaluses/ContextValue"
import RightSideBar from "./RightSideBar"
import { useAsyncError, useNavigate } from "react-router-dom"
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
        <div className="bg-linear-to-r from-[#ffee02] p-2 pb-5 md:pb-8 lg:p-8 rounded-xl via-amber-50 to-[#FFF001]">
           {openSideBar&&<RightSideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>}
            <div className="flex justify-between items-center px-1 ">
                <h1>
                    <img src={ticketLogo} alt="Ticket Logo" className="w-10 h-12 md:w-12 lg:w-22 lg:h-18 object-contain " />
                </h1>
                <h1 className="text-[#ffa216] font-black text-xl lg:text-3xl">Cine Tickets</h1>
                <p onClick={contextEmail?handleProfile:()=>navi('/login')} className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 border hover:cursor-pointer rounded-full text-md font-bold text-orange-500 flex justify-center items-center bg-linear-to-r from-amber-400 via-amber-100 to-amber-400">{contextEmail ? profileName : <img src={contact} alt=" " className="w-6 lg:w-8" />}</p>
            </div>
            <div className="border w-3/4 lg:w-1/2 h-7 md:h-8 lg:h-11 mx-auto px-1 border-gray-400 bg-gray-50 pl-4 py-1 rounded-sm flex items-center justify-between">
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="focus:outline-none  text-sm md:text-lg lg:text-2xl" />
                <button type="button" onClick={handleSearchMovie} className="flex items-center px-1 rounded-md hover:bg-linear-to-r from-yellow-300 via-yellow-50 to-yellow-300 hover:cursor-pointer group">
                    <span className="text-xs text-gray-400 lg:text-sm">search</span>
                    <img src={searchI} alt="" className="w-6 rounded-full bg-linear-to-r from-yellow-400 via-orange-100 to-yellow-300 group-hover:border-none  md:w-7 lg:w-8 border border-gray-500 p-1" />
                </button>
            </div>

        </div>
    )
}

export default NavBar