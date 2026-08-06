import React, { useEffect, useState } from 'react';
import MovieInstance from '../../axioInstances/user/movieInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clock from '../../assets/clock.png';
import backArrow from "../../assets/left-arrow.png"

const MovieDetails = () => {
  const { id } = useParams();
  const navi = useNavigate()
  console.log(id);
  const [movie, setMovie] = useState(null);
  const [mCast, setMCast] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await MovieInstance.get(`/tmdb/${id}`);
        setMovie(response?.data?.Movie);
        setMCast(response?.data?.cast);
      } catch (err) {
        console.log(err.message);
      }
    }
    getMovie();
  }, [id]);

  // }
  const runtime = movie?.runtime ?? 0;
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  const RunTime = `${hours}h ${mins}m`;

  const releaseDate = movie?.release_date
    ? new Date(movie?.release_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const trailer = movie?.videos?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );
  console.log(movie);
  console.log(mCast);
  const mainCast = mCast?.cast?.slice(0, 7) || [];

  console.log(typeof mCast);
  console.log(mainCast);

  return (
    <div className='bg-[#fcfcf1] p-2'>
      <img onClick={()=>navi(-1)} className='p-2 ml-3 hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full' src={backArrow} alt="" />
    <div className="p-3 relative py-3 md:p-14  tracking-wider flex flex-col gap-5 md:gap-8 min-h-screen">
      <div className=" rounded-lg space-y-5 ">
        <div className="rounded-2xl border w-xs lg:min-w-xl mx-auto md:w-xl">
          {/* {trailer ? (
            <iframe
              className="w-full rounded-2xl aspect-video"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie?.title} Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
            />
          ) : ( */}
            <img
              className="border rounded-2xl "
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
              alt="Poster"
            />
          {/* )}  */}
        </div>
        <div className="flex items-center justify-between text-xs lg:text-lg md:text-[16px] mt-2 gap-4">
          {movie?.vote_average !== 0 ? (
            <p className="">
              {' '}
              ⭐ {movie?.vote_average?.toFixed(1)}/10 ({movie?.vote_count}{' '}
              votes)
            </p>
          ) : (
            <p></p>
          )}
          <div className="flex flex-wrap gap-2">
            {movie?.genres?.map((g, index) => (
              <span key={index}> •{g.name}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between ">
          <p className="text-xs lg:text-lg md:text-[16px] flex gap-1 items-center">
            <img className="w-4 h-4" src={clock} alt="" />
            {RunTime}
          </p>
          <p>
            {movie?.spoken_languages?.map((l, index) => (
              <span key={index} className="text-xs md:text-[16px] lg:text-lg">
                •{l.english_name}
              </span>
            ))}
          </p>
        </div>
          <h1 className="justify-self-center lg:text-2xl md:text-xl lg:font-extrabold font-semibold text-[16px]">
            {movie?.original_title}
            <span className="text-sm lg:text-lg font-normal">
              {' '}
              ({movie?.title})
            </span>
          </h1>
        <p className="lg:text-lg md:text-[16px]">
          tagline: {movie?.tagline || ''}
        </p>
        <div className="flex items-center text-xs md:text-[16px] lg:text-lg justify-between">
          <p className="">{releaseDate || ''}</p>
          <p>status-{movie?.status || ''}</p>
        </div>
        {movie?.overview ? (
          <p className="text-xs md:text-[16px] lg:text-lg">
            <span>OverView: </span>
            {movie?.overview}
          </p>
        ) : (
          'OverView not available...'
        )}
      </div>

      <div className="grid justify-items-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mainCast?.map((cast) => (
          <div key={cast.id} className="flex flex-col gap-1 justify-center items-center">
            <img
              src={
                cast?.profile_path
                  ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                  : '/default-avatar.png'
              }
              className="border w-18 h-18 md:w-30 md:h-30 object-cover rounded-full"
              alt=""
            />
            <p className="font-semibold text-sm md:text-lg">{cast.name} </p>
            <span className="text-yellow-500 text-xs md:text-[17px]">
              ({cast.character})
            </span>
          </div>
        ))}
      </div>

      <div onClick={()=>navi(`/theaters_shows/${id}`)} className="fixed bottom-2 md:bottom-4 left-0 right-0 px-3 md:px-8 py-1">
        <button className="border w-full md:text-xl hover:cursor-pointer hover:bg-linear-to-r hover:from-yellow-400 hover:via-yellow-200 hover:to-yellow-400 border-gray-400 shadow-2xl hover:shadow-olive-500 hover:text-yellow-500 p-2 rounded-md text-[17px] lg:text-2xl lg:p-3 font-semibold bg-linear-to-r from-yellow-200 via-yellow-50 to-yellow-200">
          Book Ticket
        </button>
      </div>
    </div>
    </div>
  );
};

export default MovieDetails;
