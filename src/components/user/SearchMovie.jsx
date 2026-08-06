import React, { useContext } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import LoadSpinContent from './LoadSpinContent'
import { Link, useNavigate } from 'react-router-dom'
import backArrow from "../../assets/left-arrow.png"

const SearchMovie = () => {
    
    const {contextMovieError, contextMovieLoad,contextSearchMovie, setIsContextSearch, contextMovieData } = useContext(contextValue)
    return (
        <>
        <img onClick={()=>setIsContextSearch(false)} className='p-2 ml-3 hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full'  src={backArrow} alt="" />
        <h1 className='text-center text-lg text-neutral-800'>Search for  " {contextSearchMovie} "</h1>
        <div className='grid grid-cols-2 justify-center min-h-full  md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center'>
            {
                contextMovieLoad ? <LoadSpinContent /> :contextMovieData && contextMovieData?.length>0 ? contextMovieData.map((movie=>(
                    <div key={movie._id} className='py-8 md:pt-10 bg-linear-to-r  from-gray-50 via-amber-50 to-gray-50'>

                            <Link to={`/movie/${movie._id}`}>
                                <div className=' w-35 md:w-45 lg:w-55 hover:cursor-pointer shadow-md hover:shadow-2xl hover:translate-x-2 rounded-2xl shadow-yellow-200 transition-all hover:scale-105 duration-300'>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className='rounded-2xl' alt={movie?.title} />
                                    <p className='text-sm lg:text-xl font-semibold p-2'>{movie?.title}</p>

                                </div>
                            </Link>
                    </div>
                )
                )
            ):<p className='flex col-span-2 justify-center items-center min-h-50 text-xl text-red-500'>{contextMovieError}</p>
        }
        </div>
        </>
    )
}

export default SearchMovie