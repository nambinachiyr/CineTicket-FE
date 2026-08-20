import { useState } from 'react'
import close from "../../assets/close (1).png"
import { useNavigate } from 'react-router-dom'
import add from "../../assets/magic.png"
const SideBarTA = ({data,setOpenSideBar}) => {
    console.log(data)
    const navi = useNavigate()  
    const runningMovies = data?.runningMovies || []
    console.log(runningMovies) 
    const [moviesOpen,setMoviesOpen] = useState(false)

  return (
    <>
    <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] md:hidden'>
    </div>
    <div className={`fixed text-[15px] rounded-xl md:text-xl flex flex-col z-[60] gap-5 md:gap-10 p-4 top-35 left-5 w-50 md:w-59 md:h-screen  h-70 bg-[#111722] text-white overflow-y-auto ${moviesOpen?'min-h-[80vh] overflow-y-auto':''}`}>
        <img onClick={()=>setOpenSideBar(false)} className='w-5 h-5 invert top-1 right-1 block md:hidden absolute hover:cursor-pointer bg-white/5' src={close} alt="" />
        <p onClick={()=>navi('/theater-admin/theater')} className='hover:text-blue-500 mt-2 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>
            <span>Theater</span>
        </p>
        <p  className='flex flex-row-reverse justify-between'>
            <img className='hover:cursor-pointer hover:scale-x-75 hover:border-white/10 hover:bg-white/5 transition-all ' onClick={()=>navi('/theater-admin/addscreen')} src={add} alt="" />
            <span className='hover:text-blue-500 hover:font-semibold hover:border-white/10 hover:bg-white/5 hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer' >Screens</span>
        </p>
        <p   className='flex flex-row-reverse justify-between'>
                        <img className='hover:cursor-pointer hover:scale-x-75hover:border-white/10 hover:bg-white/5 transition-all ' onClick={()=>navi('/theater-admin/addshow')} src={add} alt="" />

            <span className='hover:text-blue-500 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>Shows</span>
        </p>
        <p className='hover:text-blue-500 hover:font-semibold hover:scale-105 transition-all hover:tracking-widest duration-200 hover:cursor-pointer'>
            <span onClick={()=>moviesOpen?setMoviesOpen(false):setMoviesOpen(true)}>Running Movies </span>
        </p>
        {
            moviesOpen?runningMovies.length!==0&&runningMovies?.map(movie=>(
              <div className='border border-white/10 bg-white/[0.03] p-2 '>
                <p className='border-b text-sm font-medium text-gray-200'>{movie.title} </p>
                <p className='mt-1 textxs text-gray-500'>showCount - {movie.showCount}</p>
              </div>
            )): <p className='px-3 py-2 text-xs text-gray-500'>{runningMovies.length===0?"No Runing Movies":""}</p>
        }
    
    </div>
    
    </>
  )
}

export default SideBarTA