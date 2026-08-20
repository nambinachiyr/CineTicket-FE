import React from 'react'
import { Link } from 'react-router-dom'

const MovieCards = ({movieData}) => {
    if(!movieData?.poster_path) return null
  return (
    <Link to={`movie/${movieData._id}`}
    className='group block w-[130px] shrink-0 min-[360px]:w-[145px] sm:w-[160px]
    md:w-[175px] lg:w-[185px] xl:w-[195px] focus:outline-none'>

        <article className='overflow-hidden rounded-xl border border-white/10 bg-[#111722]
        shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300
        hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]
        active:scale-[0.98]'>

            <div className='aspect-[2/3] w-full overflow-hidden bg-[#161b25]'>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} loading='lazy' 
             alt="poster" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />

            </div>

            <div className='flex min-h-[52px] items-center px-2.5 py-2.5 sm:min-h-[58px] sm:px-3 sm:py-3'>
               <h3 className='line-clamp-1 text-xs font-semibold leading-4 text-gray-100 sm:text-sm sm:leading-5 ' 
                 title={movieData?.title}>
                  {movieData?.title}
               </h3>
            </div>

        </article>
        
    </Link>
  )
}

export default MovieCards