import searchWhite from "../../assets/search (3).png"
import ticketLogo from ".../../../src/assets/ticket1.png"
import contact from ".../../../src/assets/contact.png"
import { useContext, useState } from "react"
import { contextValue } from "../../contextvaluses/ContextValue"
import RightSideBar from "./RightSideBar"
import { useNavigate } from "react-router-dom"
import MovieInstance from "../../axioInstances/user/movieInstance"
import Location from './Location'
import My_BookingOrder from "./my-BookingOrder"
import close from '../../assets/close (1).png'
const NavBar = () => {
    const navi = useNavigate()
    const [search, setSearch] = useState('')
    const [openSideBar, setOpenSideBar] = useState(false)

    const [openBookings,setOpenBookings] = useState(false)

    const [selectLocation, setSelectLocation] = useState(false);
    const [stateLocation, setStateLocation] = useState(false);
    const [cityLocation, setCityLocation] = useState(false);

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
        setContextSearchMovie, contextState, setContextState, contextCity, setContextCity } = useContext(contextValue)

    // console.log(contextEmail)

    const profileName = contextEmail ? contextEmail.charAt(0).toUpperCase() : ""

    const handleSearchMovie = async () => {
        const searchValue = search.trim()
        if (!searchValue) return
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
        finally {
            setContextMovieLoad(false)
            // setSearch('')

        }
    }

    function handleProfile() {
        setOpenSideBar(true)
    }

    // function handleOneCity() {
    //     setSelectLocation(true);
    //     setCityLocation(true);
    //     setStateLocation(false);
    // }

    function handleOneState() {
        selectLocation ? setSelectLocation(false) : setSelectLocation(true);
        setStateLocation(true);
        setCityLocation(false);
    }

    function handleBookings(){
      setOpenBookings(true)
    }
    return (
        <div className="relative">
            {openSideBar && <RightSideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />}
            {/* <div className="bg-[#0f0f0f] border-b border-gray-800 px-4 py-4 md:px-8 md:py-5"> */}
            <header className="sticky top-0 tracking-wider z-40 w-full  border-b border-gray-200 bg-[#111827] backdrop-blur-xl">
                <div className="max-w-[1400px] justify-between flex flex-col mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-8 gap-y-3 md:gap-y-2 lg:gap-y-0 md:gap-4 lg:px-10">
                    <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                        <div className="flex w-full items-center justify-between gap-3">
                            <button type='button' onClick={() => navi('/')} className="flex min-w-0 items-center gap-2 sm:gap-3">
                                <img src={ticketLogo} alt="Ticket Logo" className="w-9 h-9 shrink-0 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain " />
                                <p className="text-white truncate font-black text-xl min-[360px]:text-xl sm:text-2xl lg:text-[28px] lg:text-3xl">Cine <span className="text-red-500">Tickets</span></p>
                            </button>
                            <div className="flex gap-3">
                                <button className="text-white hover:text-red-500 hover:cursor-pointer active:text-red-700" onClick={handleBookings}>My Booking</button>
                                <button type="button" aria-label={contextEmail ? "Open Profile" : "LogIn"} onClick={contextEmail ? handleProfile : () => navi('/login')} className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 border hover:cursor-pointer rounded-full font-bold text-red-500 active:bg-red-800 hover:text-white hover:bg-red-500 flex justify-center items-center border-white/15 text-[18px] shadow-sm transition-all duration-200 active:scale-95 sm:h-10 sm:w-10 bg-white/[0.06]">{contextEmail ? profileName : <img src={contact} alt=" " className="w-5 h-5 sm:w-6 sm:h-6  object-contain" />}</button>
                            </div>                        
                        </div>
                    </div>
                    <div className="border border-white/10 w-full gap-2 rounded-xl lg:w-1/2 mt-1 h-9 md:w-3/4 md:min-h-11 lg:min-h-12 mx-auto px-2 py-1 bg-white/[0.06] p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition focus-within:border-red-500/50 focus-within:bg-white/[0.08] sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-between">
                        <img src={searchWhite} className='w-5 object-contain ' alt="" />
                        <input type="search" placeholder="Search for movie . . ." aria-label="search movies" onKeyDown={(e) => { if (e.key === "Enter") { handleSearchMovie() } }} value={search} onChange={(e) => setSearch(e.target.value)} className="focus:outline-none tracking-normal min-w-0 flex-1 bg-transparent text-sm px-1 py-2  placeholder:text-gray-500 text-white sm:px-2 sm:text-[15px] md:py-3 md:text-base lg:text-[17px]" />
                        <button type="button" disabled={!search.trim()} onClick={handleSearchMovie} className="flex shrink-0 rounded-lg items-center bg-red-500 active:bg-red-700 text-xs font-semibold text-white transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 sm:px-5 sm:text-sm md:px-5 md:py-2 hover:bg-red-600 px-4 py-2 hover:cursor-pointer group">
                            <span className="text-xs active:text-white lg:text-sm">search</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 ">
                    <button
                        onClick={handleOneState}
                        className="hover:cursor-pointer flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white hover:text-red-600 active:text-red-800 hover:scale-95 transition-all"
                    >
                        <span>📍</span>
                        {' '}
                        <span>
                            {contextCity?.name || "Select Location"}
                        </span>
                    </button>
                </div>

                <div>
                    {selectLocation && (
                        <div className='fixed inset-0 z-40 w-full bg-black/60 backdrop-blur-[0.2]'>
                            <div className="fixed top-45  backdrop-blur-lg z-80 right-10 md:right-15">
                                <Location
                                    stateLocation={stateLocation}
                                    setStateLocation={setStateLocation}
                                    cityLocation={cityLocation}
                                    setCityLocation={setCityLocation}
                                    handleOneState={handleOneState}
                                    setSelectLocation={setSelectLocation}
                                    selectLocation={selectLocation}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {
                openBookings&&<div onClick={()=>setOpenBookings(false)} className="fixed h-full inset-0 p-8 bg-black/20 z-50 border  overflow-y-auto scrollbar-hide border-white/20 mx-2"><div onClick={(e)=>e.stopPropagation()} className="absolute  right-0 top-20 border border-white/10 m-2 bg-gray-100/60 px-10 py-5"><img className="w-5 ml-auto mb-2" src={close} onClick={()=>setOpenBookings(false)}/>
                <My_BookingOrder/>
                </div></div>
            }
        </div>
    )
}

export default NavBar