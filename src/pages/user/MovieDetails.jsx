import React, { useContext, useEffect, useState } from 'react';
import MovieInstance from '../../axioInstances/user/movieInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clock from '../../assets/clock.png';
import backArrow from "../../assets/left-arrow.png"
import LoadSpin from '../../components/user/LoadSpinButton';
import LoadSpinContent from '../../components/user/LoadSpinContent';
import { contextValue } from '../../contextvaluses/ContextValue';
import close from '../../assets/close (1).png'

const MovieDetails = () => {
  const { id } = useParams();
  const navi = useNavigate()
  // console.log(id);
  const { contextState, contextCity } = useContext(contextValue)

  const [movie, setMovie] = useState(null);
  const [mCast, setMCast] = useState(null);

  const [msg, setMsg] = useState('')
  const [load, setLoad] = useState(true)

  const [display, setDisplay] = useState(false)

  async function getMovie() {
    try {
      setLoad(true)
      // setDisplay(false)
      // console.log("Entering")
      const response = await MovieInstance.get(`/tmdb/${id}`);
      setMovie(response?.data?.Movie || null);
      setMCast(response?.data?.cast || null);
      console.log("Finised")
    } catch (err) {
      // setDisplay(true)
      setMsg(err.response?.data?.message || "Unable to load movie details");
    }
    finally {
      setLoad(false)
    }
  }
  useEffect(() => {
    if (!id) return
    // console.log("Before API call")
    getMovie();
  }, [id]);

  // }
  const runtime = movie?.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  const RunTime = runtime > 0 ? `${hours}h ${mins}m` : "Runtime unavailable";

  const releaseDate = movie?.release_date
    ? new Date(movie?.release_date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : 'Release date unavailable';

  // const trailer = movie?.videos?.results?.find(
  //   (video) => video.site === 'YouTube' && video.type === 'Trailer',
  // );
  // console.log(movie);
  // console.log(mCast);

  const mainCast = mCast?.cast?.slice(0, 7) || [];

  // console.log(contextCity,contextState);
  // console.log(mainCast);

  // Loading
  if (load) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#070a10]'>
        <LoadSpinContent />
      </div>
    )
  }

  // Error
  if (msg) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4 text-white'>
        <div className='w-full max-w-md rounded-2xl border border-red-500/50 bg-[#111722] px-6 py-8 text-center'>
          <img onClick={() => navi(-1)} className='w-5 h-5 hover:bg-red-500/50 border hover:cursor-pointer border-white/10' src={close} alt="" />
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl font-red-400'>
            !
          </div>
          <h2 className='text-lg font-semibold text-white sm:text-xl'>
            Movie details unavailable
          </h2>
          <p className='mt-2 text-sm leading-6 text-gray-400'>
            {msg}
          </p>
          <button type='button'
            onClick={getMovie}
            className='mt-5 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white trasition hover:bg-red-600 active:scale-95'>
            Try Again
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className='bg-[#FFFFFF] text-gray-900'>
      {/* Page Container */}
      <div className="p-1 w-full max-w-[1400px] pt-2 px-1 pb-18 sm:px-5 md:px-8 lg:px-10  min-h-screen">
        <img onClick={() => navi(-1)} className='p-1 w-7 bg-white/10  ml-3 mt-3 hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full' src={backArrow} alt="" />

        {/* Movie Details Card */}
        <section className='rounded-xl p-4 py-6 bg-[#F8FAFC]'>
          <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path})` }} className="relative overflow-hidden rounded-2xl h-[460px]  md:min-h-[560px] lg:min-h-[500px] bg-cover bg-center">
            <div className='absolute inset-0 bg-black/65'></div>
            <div className='relative z-10 flex h-full min-h-[430px] flex-col gap-6 p-5 text-white md:min-h-[460px] md:p-8 lg:min-h-[500px] lg:flex-row lg:items-center lg:gap-10 lg:p-10'>
              <div className="mx-auto shrink-0 lg:mx-auto ">

                <img
                  className="rounded-2xl h-[280px] w-[190px] object-cover shadow-2xl sm:h-[320px] sm:w-[215px] md:h-[350px] md:w-[235px] lg:h-[390px] lg:w-[260px]"
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
                  alt="Movie-Poster" />

              </div>
              <div className="flex items-center lg:flex-col justify-between lg:justify-center text-xs md:text-[16px] mt-2 gap-4">
                <h1 className="justify-self-center hidden lg:flex lg:text-xl justify-center items-center md:text-xl lg:font-extrabold font-semibold text-[16px]">
                  {movie?.original_title}
                  <span className="text-sm lg:text-lg font-normal">
                    {' '}
                    {(movie?.original_title===movie?.title)?"":<p className='ml-1 text-sm'> ( {movie?.title} ) </p>}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2 lg:text-sm w-full">
                  {movie?.vote_average !== 0 ? (
                    <p className="text-xs">
                      {' '}
                      ⭐ {movie?.vote_average?.toFixed(1)}/10 ({movie?.vote_count}{' '}
                      votes)
                    </p>
                  ) : (
                    <p></p>
                  )}
                  <h1 className="justify-self-center mx-auto lg:hidden lg:text-2xl md:text-xl lg:font-extrabold font-semibold text-[18px]">
                    {movie?.original_title}
                    {movie?.original_title && movie?.original_title !== movie?.title && (
                      <span className="text-sm text-gray-400 font-normal">
                        {' '}
                        ({movie?.title})
                      </span>
                    )}
                  </h1>
                  <div className='text-end flex gap-2 ml-auto '>
                    {movie?.genres?.map((g, index) => (
                      <span key={index}> •{g.name}</span>
                    ))}
                  </div>

                </div>
                <div className="lg:flex hidden items-center gap-2 text-xs md:text-[16px] lg:text-xs justify-between">
                  <p className="">{releaseDate || ''}</p>
                  <p>|</p>
                  <p>status-{movie?.status || ''}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2 lg:gap-x-15 items-center">
                <p className="text-xs lg:text-sm md:text-[16px] flex gap-1 items-center">
                  <img className="w-4 h-4" src={clock} alt="" />
                  {RunTime}
                </p>

                <p>
                  {movie?.spoken_languages?.map((l, index) => (
                    <span key={index} className="text-xs md:text-[15px] lg:text-sm text-center">
                      •{l.english_name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          {
            movie?.tagline &&
            <p className="lg:hidden mt-3 md:text-[16px]">
              tagline: {movie?.tagline}
            </p>
          }
          <div className="flex items-center mt-3 text-xs lg:hidden md:text-[16px] lg:text-lg justify-between">
            <p className="">{releaseDate || ''}</p>
            <p>status-{movie?.status || ''}</p>
          </div>
          {movie?.overview ? (
            <p className="text-xs md:text-[16px] lg:text-sm my-3 md:my-8 px-2">
              <span className='font-bold text-[16px] lg:text-xl '>OverView: </span>
              <span className='text-sm tracking-wider pl-2'>{movie?.overview}</span>
            </p>
          ) : (
            'OverView not available...'
          )}
          <p className='border-b mb-3 border-dashed border-neutral-400 w-[90%] mx-auto'></p>
          <div className="grid justify-items-center gap-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {mainCast?.map((cast) => (
              <div key={cast.id} className="flex flex-col gap-1 justify-center items-center">
                <img
                  src={
                    cast?.profile_path
                      ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                      : '/default-avatar.png'
                  }
                  className="w-22 h-27 md:w-25 md:h-25 object-cover rounded-2xl"
                  alt={cast.name}
                />
                <p className="font-semibold text-sm md:text-[15px]">{cast.name} </p>
                <span aria-label={cast.character} className="text-red-500 text-xs md:text-[15px] w-35 lg:w-50 text-center  truncate">
                  ({cast.character})
                </span>
              </div>
            ))}
          </div>

        </section>
        <div onClick={() => navi(`/theaters_shows/${id}/${contextState?._id}/${contextCity?._id}`)} className="fixed flex justify-center bottom-2 md:bottom-4 left-0 right-0 px-3 md:px-8 py-1">
          <button className="lg:w-2xl md:w-80 w-90 md:text-xl hover:cursor-pointer hover:bg-red-700 bg-red-500 border-gray-400  p-2 rounded-md text-[17px] lg:text-2xl lg:p-3 font-semibold text-white hover:text-gray-200">
            Book Ticket
          </button>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;
