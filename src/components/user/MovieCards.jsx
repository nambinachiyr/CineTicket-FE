
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { contextValue } from '../../contextvaluses/ContextValue'

const MovieCards = ({ movieData }) => {

  const navi = useNavigate()

  const lang = {
    ta:"Tamil",
    en:"English",
    te:"Telugu",
    hi:"Hindi",
    ml:"Malayalam",
    kn:"Kannada"
  }
  const {contextCity,contextState} = useContext(contextValue)

  function handleShows(){
    if(!contextState?._id || !contextCity?._id) return
    navi(`/theaters_shows/${movieData?._id}/${contextState?._id}/${contextCity?._id}`)
  }
  if (!movieData?.poster_path) return null

  return (
    <div className='flex flex-col justify-center items-center'>
    <div
      className='group block shrink-0 max-w-[300px] w-[135px] sm:w-[165px]
    md:w-[190px] lg:w-[205px] xl:w-[215px] focus:outline-none'>

      <article className='overflow-hidden rounded-xl 
        shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300
        hover:-translate-y-1  hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]
        active:scale-[0.98] text-[#6B7280]'>

        <div onClick={()=>navi(`/movie/${movieData?._id}`)} className='aspect-[2/3] w-full hover:cursor-pointer overflow-hidden bg-[#161b25]'>
          <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} loading='lazy'
            alt="poster" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />

        </div>

        <div className='flex min-h-[52px] gap-3 flex-col px-2.5 py-2.5 sm:min-h-[58px] sm:px-3 sm:py-3'>
          <div className='flex justify-between'>
            <h3 className='line-clamp-1 md:text-lg font-semibold leading-4 text-[#4b4c50] sm:text-sm sm:leading-5 '
            title={movieData?.title}>
            {movieData?.title}
          </h3>
          <p className='flex gap-0.5 items-center justify-center text-gray-400 text-sm font-bold'><span className='text-[10px]'>⭐</span>{movieData?.vote_average?Number(movieData?.vote_average).toFixed(1) : "N/A"}</p>
          </div>
          <div>
            <span className='text-gray-500 text-sm text-end'>{lang[movieData?.original_language] || "Language unavailable"}</span>
            <p>{}</p>
          </div>
    <button onClick={handleShows}  disabled={!contextState?._id || !contextCity?._id} className='shadow-md disabled:bg-gray-500 shadow-olive-100 self-center hover:bg-red-600 hover:scale-90 hover:cursor-pointer p-1 text-sm px-3 rounded-2xl bg-red-500 text-white'>View Shows</button>
        </div>


      </article>
    </div>
    </div>
  )
}

export default MovieCards