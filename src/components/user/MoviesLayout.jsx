import React, { useContext, useEffect, useRef, useState } from 'react';
import MovieInstance from '../../axioInstances/user/movieInstance';
import { Link, useNavigate } from 'react-router-dom';
import { contextValue } from '../../contextvaluses/ContextValue';
import LoadSpinContent from './LoadSpinContent';
import MovieCards from './MovieCards';
import searchWhite from "../../assets/search (3).png";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

const MoviesLayout = () => {

    const navi = useNavigate()

    const [movie, setMovie] = useState([]);
    // const [trendMovies, setTrendMovies] = useState([]);
    const [popularity, setPopularity] = useState([]);

    const recommentRef = useRef(null)

    const {setContextBooking, setContextHome, contextState, contextCity,setContextMovieError,
        setContextMovieData,setContextMovieLoad,setContextSearchMovie,
        setIsContextSearch,
     } =
        useContext(contextValue);

    const [movieLoading, setMovieLoading] = useState(true);
    const [popularLoading, setPopularLoading] = useState(true);
    const [movieError, setMovieError] = useState('');

     const [search, setSearch] = useState('')

    
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


    // Popular Movies Fetching
    async function PopularMovies() {
        // console.time("popular")

       try{
         // console.log(contextCity);
         setPopularLoading(true)
        const response = await MovieInstance.get(
            `/${contextState?._id}/${contextCity?._id}/popularity`,
        );
        // console.log(response?.data?.movies);
        setPopularity(response?.data?.movies || []);
       }catch(err){
        setPopularity([])
        }finally{
        setPopularLoading(false)
       }

    //    console.timeEnd("popular")

    }

    // Now_Playing Movies
    async function moviesFetch() {

        // console.time("Movie")
       try{
        setMovieLoading(true)
         const response = await MovieInstance.get(
            `/${contextState?._id}/${contextCity?._id}/now_playing`,
        );
        console.log(response?.data?.movies.map(m => m.title));
        setMovie(response?.data?.movies || []);
       }catch(err){
        return setMovieError(!err?.response ? "Check your internet connection " :err?.response?.data?.message || "unable to fetch movies")
       }finally{
        setMovieLoading(false)
       }
    //    console.timeEnd("Movie")

    }

    // Trending movies
    // async function trending() {


    //     const response = await MovieInstance.get(
    //         `/${contextState?._id}/${contextCity?._id}/toprated`,
    //     );
    //     // console.log(response?.data?.movies);
    //     setTrendMovies(response?.data?.movies || []);

    // }

    // Retry movie
    //  LOAD ALL MOVIES
    // async function loadMovies() {
    //     try {
    //         setLoading(true);
    //         setMovieError('');

    //         await Promise.all(
    //             [moviesFetch(),
    //             // trending(),
    //             PopularMovies()]);
    //     } catch (err) {
    //         setMovieError(
    //             !err.response
    //                 ? 'Network Error. Please check Your Internet Connection.'
    //                 : err.response?.data?.message || 'Unable to load movies',
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    useEffect(() => {
        if (!contextState?._id || !contextCity?._id) return;
        setContextHome(true)
        setContextBooking(false)
        moviesFetch(),
        PopularMovies()
    }, [contextState, contextCity]);


    const scrollRecommended = (direction) => {
        const container = recommentRef.current
        console.log(container)
        if (!container) return;

        const width = container.clientWidth;
        container.scrollBy({
            left: direction === 'left' ? -width : width,
            behavior: 'smooth'
        })
    }

    function handleShows(movieId){
        if(!contextState?._id || !contextCity?._id) return
        navi(`/theaters_shows/${movieId}/${contextState?._id}/${contextCity?._id}`)
    }

    // Just Changed

    return (
        <div className="relative p-0 flex w-full flex-col gap-3">

            <div className="border border-white/10 w-full gap-2 rounded-xl lg:w-1/2 h-9 md:w-3/4 md:min-h-10 lg:min-h-10 mx-auto px-0.5 py-0.5 bg-white/[0.06] shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition focus-within:border-red-500/50 focus-within:bg-white/[0.08] sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-between">
                        <img src={searchWhite} className='w-5 object-contain ' alt="" />
                        <input type="search" placeholder="Search for movie . . ." aria-label="search movies" onKeyDown={(e) => { if (e.key === "Enter") { handleSearchMovie() } }} value={search} onChange={(e) => setSearch(e.target.value)} className="focus:outline-none tracking-normal min-w-0 flex-1 bg-transparent text-sm px-1 py-2  placeholder:text-gray-500 text-neutral-600 sm:px-2 sm:text-[15px] md:py-2 md:text-base lg:text-[17px]" />
                        <button type="button" disabled={!search.trim()} onClick={handleSearchMovie} className="flex shrink-0 rounded-lg items-center bg-red-500 active:bg-red-700 text-xs font-semibold text-white transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 sm:px-5 sm:text-sm md:px-5 md:py-2 hover:bg-red-600 px-4 py-2 hover:cursor-pointer group">
                            <span className="text-xs active:text-white lg:text-sm">search</span>
                        </button>
                    </div>


           

             {/* Error */}

             {
                !movieLoading  && movieError ? (
                    <div className='flex min-h-[45vh] items-center justify-center'>
                        <div className='text-center'>
                            <p className='text-sm text-gray-300'>{movieError}</p>
                            <button onClick={()=>{moviesFetch(),PopularMovies()}} className='mt-4 rounded-lg hover:cursor-pointer text-gray-100 bg-red-500 px-4 py-2 text-sm font-semibold'>Retry</button>
                        </div>
                    </div>

                ) 
         :          
                movieLoading || popularLoading ? (
                    <div className='flex flex-wrap gap-5 min-h-[45vh] py-5 items-center backdrop-blur-sm bg-gray-500/1 '>
                        {
                            [1, 2, 3, 4, 5].map(s => (
                                <div key={s} className='w-38 h-59 border rounded-xl border-gray-300'></div>
                            ))
                        }
                        <p className='fixed left-[40%]'><LoadSpinContent /></p>
                    </div>
                ):(
                    <div className='mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-10'>
                        <div className='flex flex-col gap-10'>

                            {/* Recommended / Popular Movies */}

                            <div className="flex flex-col gap-4">

                                {/* Heading + Arrow Buttons */}
                                <div className="flex items-center justify-between px-2">

                                    {/* <h1 className="text-xl font-semibold tracking-wide text-[#111827]">
            Recommended <span className="text-red-500">Movies</span>
        </h1> */}

                                    <div className="flex items-center text-center mx-auto my-auto w-full justify-between">

                                        {/* Left */}
                                        <button
                                            type="button"
                                            onClick={() => scrollRecommended('left')}
                                            className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full my-auto
                    border border-gray-300
                    bg-white
                    text-gray-700
                    shadow-sm
                    transition-all
                    hover:border-red-500
                    hover:bg-red-500
                    hover:text-white
                    active:scale-90
                    text-center
                    hover:cursor-pointer
                "
                                        >
                                            <span className='flex items-center w-4 justify-center'><img src={leftArrow} alt="" /></span>
                                        </button>

                                        {/* Right */}
                                        <button
                                            type="button"
                                            onClick={() => scrollRecommended('right')}
                                            className="
                    flex h-8 w-8 my-auto items-center justify-center
                    text-center
                    rounded-full
                    border border-gray-300
                    bg-white
                    text-4xl
                    text-gray-700
                    shadow-sm
                    transition-all
                    hover:border-red-500
                    hover:bg-red-500
                    hover:text-white
                    active:scale-90
                    hover:cursor-pointer
                "
                                        >
                                            <span className='flex items-center w-4 justify-center'><img src={rightArrow} alt="" /></span>
                                        </button>

                                    </div>

                                </div>


                                {/* Movies Carousel */}
                                <div
                                    ref={recommentRef}
                                    className="
            flex
            w-full
            snap-x
            snap-mandatory
            overflow-x-auto
            scroll-smooth
            scrollbar-hide
        "
                                >
          
            
.
                                 {
                                    // popularLoading?<div className="flex min-h-[300px] w-full items-center justify-center"><LoadSpinContent/></div> :(

                                        !popularLoading && popularity?.length > 0 && (
    
                                            popularity.map((popularMovie) => (
    
                                                <div
                                                    key={popularMovie._id}
                                                    style={{
                                                        backgroundImage: `url(
                                https://image.tmdb.org/t/p/original${popularMovie?.backdrop_path ||
                                                            popularMovie?.poster_path
                                                            }
                            )`
                                                    }}
                                                    className="
                            relative
                            h-[330px]
                            w-full
                            shrink-0
                            snap-start
                            overflow-hidden
                            rounded-2xl
                            bg-cover
                            bg-center
                            sm:h-[230px]
                            md:h-[280px]
                            lg:h-[320px]
                        "
                                                >
    
                                                    {/* Dark Gradient */}
                                                    <div className="
                            absolute inset-0
                            bg-gradient-to-r
                            from-black/90
                            via-black/65
                            to-black/30
                        ">
                                                    </div>
    
    
                                                    {/* Content */}
                                                    <div className="
                            relative
                            z-10
                            flex
                            h-full
                            items-center
                            gap-6
                            p-5
                            text-white
                            sm:p-7
                            md:p-10
                            lg:gap-10
                        ">
    
                                                        {/* Small Poster */}
                                                        <div className="hidden shrink-0 sm:block">
    
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w500${popularMovie?.poster_path ||
                                                                    popularMovie?.backdrop_path
                                                                    }`}
                                                                alt={`${popularMovie?.title || 'Movie'} poster`}
                                                                className="
                                        h-[300px]
                                        w-[200px]
                                        rounded-xl
                                        object-cover
                                        shadow-2xl
                                        md:h-[350px]
                                        md:w-[235px]
                                        lg:h-[390px]
                                        lg:w-[260px]
                                    "
                                                            />
    
                                                        </div>
    
    
                                                        {/* Movie Details */}
                                                        <div className="flex max-w-2xl flex-col justify-center">
    
                                                            <p className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-red-400
                                ">
                                                                Recommended Movie
                                                            </p>
    
    
                                                            {/* Title */}
                                                            <h2 className="
                                    text-2xl
                                    font-bold
                                    sm:text-3xl
                                    lg:text-4xl
                                ">
                                                                {popularMovie?.original_title ||
                                                                    popularMovie?.title}
                                                            </h2>
    
    
                                                            {/* Different translated title */}
                                                            {popularMovie?.original_title &&
                                                                popularMovie?.title &&
                                                                popularMovie.original_title !== popularMovie.title && (
    
                                                                    <p className="mt-1 text-sm text-gray-300">
                                                                        {popularMovie.title}
                                                                    </p>
    
                                                                )}
    
    
                                                            {/* Rating */}
                                                            {popularMovie?.vote_average > 0 && (
    
                                                                <div className="mt-4 flex flex-wrap items-center gap-3">
    
                                                                    <span className="
                                            rounded-full
                                            bg-white/10
                                            px-3
                                            py-1
                                            text-xs
                                            backdrop-blur-sm
                                        ">
                                                                        ⭐ {popularMovie.vote_average.toFixed(1)}/10
                                                                    </span>
    
                                                                    {popularMovie?.vote_count > 0 && (
                                                                        <span className="text-xs text-gray-300">
                                                                            {popularMovie.vote_count} votes
                                                                        </span>
                                                                    )}
    
                                                                </div>
    
                                                            )}
    
    
                                                            {/* Genres */}
                                                            {popularMovie?.genres?.length > 0 && (
    
                                                                <div className="mt-3 flex flex-wrap gap-2">
    
                                                                    {popularMovie.genres
                                                                        .slice(0, 3)
                                                                        .map((genre, index) => (
    
                                                                            <span
                                                                                key={genre?._id || genre?.id || index}
                                                                                className="
                                                        rounded-full
                                                        border
                                                        border-white/20
                                                        bg-black/20
                                                        px-3
                                                        py-1
                                                        text-xs
                                                    "
                                                                            >
                                                                                {genre?.name}
                                                                            </span>
    
                                                                        ))}
    
                                                                </div>
    
                                                            )}
    
    
                                                            {/* Languages */}
                                                            {popularMovie?.spoken_languages?.length > 0 && (
    
                                                                <p className="mt-4 text-sm text-gray-300">
    
                                                                    {popularMovie.spoken_languages
                                                                        .slice(0, 3)
                                                                        .map(language => language?.english_name)
                                                                        .filter(Boolean)
                                                                        .join(' • ')}
    
                                                                </p>
    
                                                            )}
    
    
                                                            {/* Overview */}
                                                            {popularMovie?.overview && (
    
                                                                <p className="
                                        mt-4
                                        line-clamp-3
                                        text-sm
                                        leading-6
                                        text-gray-200
                                    ">
                                                                    {popularMovie.overview}
                                                                </p>
    
                                                            )}
    
    
                                                            {/* View Shows */}
                                            <div className='flex justify-between'>
                                                                <button onClick={()=>handleShows(popularMovie?._id)} disabled={!contextState?._id || !contextCity?._id}
                                                                
                                                                className=" disabled:bg-gray-500
                                        mt-6
                                        w-fit
                                        rounded-lg
                                        bg-red-500
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-red-600
                                        active:scale-95
                                        hover:cursor-pointer
                                    "
                                                            >
                                                                View Shows
                                                            </button>
                                                            <Link to={`movie/${popularMovie?._id}`} className='
                                                             mt-6 self-end
                                        w-fit
                                        px-5
                                        py-1.5
                                        text-lg
                                        tracking-wider
                                        font-semibold
                                        text-gray-100
                                        transition-all
                                        duration-100
                                        hover:text-gray-100
                                        rounded-xl
                                        hover:bg-red-500 
                                        active:scale-95'>
                                                                Detail <span className='bg-red-500 rounded-full w-7 h-7 p-1 font-bold'>{'->'}</span>
                                                            </Link>
    
                                            </div>
                                                        </div>
    
                                                    </div>
    
                                                </div>
    
                                            ))
                                        
    
                //                         ) : (
    
                //                             <div className="
                //     flex
                //     min-h-[300px]
                //     w-full
                //     items-center
                //     justify-center
                //     rounded-2xl
                //     bg-gray-100
                //     text-sm
                //     text-gray-500
                // ">
                //                                 No recommended movies available
                //                             </div>
    
                                        )
                                    // )
                                 }

                                </div>

                            </div>
 
        
                            <div className="flex flex-col gap-5">
                                <h1 className="text-xl font-semibold px-2 text-[#111827]  tracking-wide">
                                    Now <span className="text-red-500">Playing</span>
                                </h1>
                                <div className={`pb-4 flex overflow-x-auto scrollbar-hide gap-5 md:gap-10`}>
                                    {/* Now Playing */}

                                    {movie && movie?.length > 0 ? (
                                        movie?.map(
                                            (movieData) => (
                                            
                                              <MovieCards key={movieData._id} movieData={movieData} />
                                            
                                            ))):(
                                        <p className='text-sm text-gray-500 self-center'>No movies available in this city</p>
                                    )
                                            }
                                </div>
                            </div>
    
     

                            {/* Cut just for testing */}
                            {/* Trending Movies */}
                            {/* <div className="flex flex-col gap-3 ">
                                <h1 className="text-xl px-2 text-white font-semibold tracking-wider">
                                    Trending <span className="text-red-500">Movies</span>{' '}
                                </h1>
                                <div className="flex gap-5 overflow-x-auto pb-2">
                                    {trendMovies && trendMovies?.length > 0 ? (
                                        trendMovies?.map(
                                            (movieData) => (<MovieCards key={movieData._id} movieData={movieData} />
                                                
                                            ),
                                        )
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div> */}

                            {/* Popularity Movies */}



                        </div>

                    </div>)}
                    
                    
        </div>



    );
};

export default MoviesLayout;
