import React, { useContext } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import LoadSpinContent from './LoadSpinContent'
import { Link, useNavigate } from 'react-router-dom'
import backArrow from "../../assets/left-arrow.png"
import MovieCards from './MovieCards'

const SearchMovie = () => {
    const navi = useNavigate()
    
    const {contextMovieError, 
        contextMovieLoad,
        contextSearchMovie, 
        setIsContextSearch, 
        contextMovieData } = useContext(contextValue)
    return (

        <section className='w-full'>
            <div className='mb-5 flex items-center gap-3 sm:mb-6 md:mb-8'>
              <button onClick={()=>setIsContextSearch(false)} className='flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full border border-white/10 bg-white/[0.05] transition-all duration-200
              hover:border-red-500/40 hover:cursor-pointer hover:bg-red-500/10 active:scale-95 sm:h-10 sm:w-10'>
                <img src={backArrow} alt="" className='h-4 w-4 object-contain sm:h-5 sm:w-5'/>
              </button>

              <div className='min-w-0'>
                <p className='text-xs font-medium uppercase tracking-[0.16em] text-gray-500'>
                    Search Results
                </p>
                <h1 className='mt-0.5 truncate text-lg font-bold text-white sm:text-xl md:text-2xl'>
                    " {contextSearchMovie} "
                </h1>
              </div>
            </div>

{/* Loading */}

{
    contextMovieLoad && (
        <div className='flex min-h-[50vh] items-center justify-center'>
            <LoadSpinContent/>
        </div>
    )
}
{/* Results */}
{
    !contextMovieLoad && contextMovieData?.length>0 &&(
        <div className='grid grid-cols-2 gap-x-3 gap-y-6 min-[480px]:grid-cols-3 sm:gap-x-4 sm:gap-y-7 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-6'>
          {
            contextMovieData.map((movieData)=>(
                <div key={movieData} className='flex justify-center'>
                    <MovieCards movieData={movieData}/>
                </div>
            ))
          }
        </div>
    )
}
         {/* Empty /Error */}
         {
            !contextMovieLoad && (
                !contextMovieData ||
                contextMovieData.length===0) &&(
                    <div className='flex min-h-[45vh] items-center justify-center px-4'>
                        <div className='w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center sm:px-8 sm:py-10'>
                        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center text-lg text-red-400'>
                            !
                        </div>
                        <h2 className='text-lg font-semibold text-white sm:text-xl'>
                            No movies found
                        </h2>
                        <p className='text'>{contextMovieError || `We couldn't find any movies matching "${contextSearchMovie}"`}</p>
                        </div>
                    </div>
                )
            
         }
        </section>
        
    )
}

export default SearchMovie