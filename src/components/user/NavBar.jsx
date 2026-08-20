
import ticketLogo from ".../../../src/assets/ticket1.png"
import contact from ".../../../src/assets/contact.png"
import { useContext, useState } from "react"
import { contextValue } from "../../contextvaluses/ContextValue"
import RightSideBar from "./RightSideBar"
import { useNavigate } from "react-router-dom"
import MovieInstance from "../../axioInstances/user/movieInstance"

const NavBar = () => {
    const navi = useNavigate()
    const [search,setSearch] = useState('')
    const [openSideBar,setOpenSideBar] = useState(false)

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

    // console.log(contextEmail)
    
    const profileName = contextEmail?contextEmail.charAt(0).toUpperCase() : ""

    const handleSearchMovie = async () => {
        const searchValue = search.trim()
        if(!searchValue) return
        setIsContextSearch(true)
        try {
            setContextMovieError('')
            setContextMovieData([])
            setContextMovieLoad(true)
            console.log(search)
            const response = await MovieInstance.get(`/search?title=${encodeURIComponent(searchValue)}`)
            // console.log(response?.data?.movie)
            setContextMovieData(response?.data?.movie || [])
            setContextSearchMovie(searchValue)
        } catch (err) {
            setContextMovieError(err.response?.data?.message ||
                "Unable to search movies."
            )
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
        <>
           {openSideBar&&<RightSideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>}
        {/* <div className="bg-[#0f0f0f] border-b border-gray-800 px-4 py-4 md:px-8 md:py-5"> */}
        <header className="sticky top-0 z-40 w-full borer-b border-white/10 bg-[#080b12]/95 backdrop-blur-xl">
            <div className="flex flex-col max-w-[1400px] justify-between items-center mx-auto px-3 gap-3 py-3 sm:px-5 sm:py-4 md:px-8 md:gap-4 lg:px-10">
                <div className="flex w-full items-center justify-between gap-3">
                <h1 type='button' onClick={()=>navi('/')} className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <img src={ticketLogo} alt="Ticket Logo" className="w-9 h-9 shrink-0 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain " />
                </h1>
                <h1 className="text-white truncate font-black text-xl min-[360px]:text-xl sm:text-2xl lg:text-[28px] lg:text-3xl">Cine <span className="text-red-500">Tickets</span></h1>
                <button type="button" aria-label={contextEmail?"Open Profile":"LogIn"} onClick={contextEmail?handleProfile:()=>navi('/login')} className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 border hover:cursor-pointer rounded-full text-md font-bold text-white flex justify-center items-center border-white/15 text-sm shadow-sm transition-all duration-200 active:scale-95 sm:h-10 sm:w-10 md:text-base hover:bg-red-500/10 bg-white/[0.06]">{contextEmail ? profileName : <img src={contact} alt=" " className="w-5 h-5 sm:w-6 sm:h-6  object-contain" />}</button>
            </div>
            </div>
            <div className="border border-white/10 w-full gap-2 rounded-xl lg:w-1/2 h-7 md:h-8 lg:h-11 mx-auto px-1 py-1 bg-white/[0.06] p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition focus-within:border-red-500/50 focus-within:bg-white/[0.08] sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-between">
                <input type="search" aria-label="search movies" onKeyDown={(e)=>{if(e.key === "Enter"){handleSearchMovie()}}}  value={search} onChange={(e)=>setSearch(e.target.value)} className="focus:outline-none min-w-0 flex-1 bg-transparent text-sm px-1 py-2  placeholder:text-gray-500 text-white sm:px-2 sm:text-[15px] md:py-2.5 md:text-base lg:text-[17px]" />
                <button type="button" disabled={!search.trim()} onClick={handleSearchMovie} className="flex shrink-0 rounded-lg items-center bg-red-500 text-xs font-semibold text-white transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 sm:px-4 sm:text-sm md:px-5 md:py-2.5 hover:bg-red-600 px-2 py-1 hover:cursor-pointer group">
                    <span className="text-xs text-gray-400 lg:text-sm">search</span>
                </button>
            </div>

        </header>
        </>
    )
}

export default NavBar