import React, { useContext, useEffect, useState } from 'react'
import MovieInstance from '../../axioInstances/user/movieInstance'
import LoadSpin from './LoadSpinButton'
import { Link } from 'react-router-dom'
import { contextValue } from '../../contextvaluses/ContextValue'
import Location from './Location'


const MoviesLayout = () => {
    const [movie, setMovie] = useState([])
    const [load,setLoad] = useState(false)
    const [upcoming, setUpcoming] = useState([])
    const [trendMovies, setTrendMovies] = useState([])
    const [popularity,setPopularity] = useState([])
    const [selectLocation, setSelectLocation] = useState(false)
    const [stateLocation, setStateLocation] = useState(false)
    const [cityLocation, setCityLocation] = useState(false)
    const { contextState, setContextState, contextCity, setContextCity } = useContext(contextValue)
    useEffect(() => {
        if(!contextState?._id || !contextCity?._id) return

        async function moviesFetch() {
            try {
                setLoad(true)
                console.log(contextCity)
                const response = await MovieInstance.get(`/${contextState?._id}/${contextCity?._id}/now_playing`)
                console.log(response?.data?.movies)
                setMovie(response?.data?.movies)
            } catch (err) {
                console.log(err.message)
            }finally{
                setLoad(false)
            }
        }

        async function Upcoming() {
            try {
                console.log(contextCity)
                const response = await MovieInstance.get(`/${contextState?._id}/${contextCity?._id}/upcoming`)
                console.log(response?.data?.movies)
                setUpcoming(response?.data?.movies)
            } catch (err) {
                console.log(err.message)
            }
        }

        async function trending() {
            try {
                console.log(contextCity)
                const response = await MovieInstance.get(`/${contextState?._id}/${contextCity?._id}/toprated`)
                console.log(response?.data?.movies)
                setTrendMovies(response?.data?.movies)
            } catch (err) {
                console.log(err.message)
            }
        }

        async function PopularMovies() {
            try {
                console.log(contextCity)
                const response = await MovieInstance.get(`/${contextState?._id}/${contextCity?._id}/popularity`)
                console.log(response?.data?.movies)
                setPopularity(response?.data?.movies)
            } catch (err) {
                console.log(err.message)
            }
        }

        


        moviesFetch()
        Upcoming()
        trending()
        PopularMovies()
    }, [contextState,contextCity])
    console.log(movie, "NOW_PLAYINg")
    console.log(upcoming, "UPCOMING")
    console.log(trendMovies, "Trending")
    console.log(popularity,"POPULAR")
    function handleOneCity() {
        setSelectLocation(true)
        setCityLocation(true)
        setStateLocation(false)
    }

    function handleOneState() {
        console.log(":Stet")
        setSelectLocation(true)
        setStateLocation(true)
        setCityLocation(false)
    }

    return (
        <div className='reletive'>


            <div className='flex items-end justify-end gap-3 text-lg pr-6'>
                <p className=' '>📍 {contextCity?.name},</p>
                <p onClick={handleOneState} className='hover:cursor-pointer hover:scale-95 transition-all'> {contextState?.name}</p>
            </div>

            {
                selectLocation && (
                    <div className='fixed right-2 md:right-5'>
                        <Location stateLocation={stateLocation} setStateLocation={setStateLocation} cityLocation={cityLocation} setCityLocation={setCityLocation} />
                    </div>

                )}


            {
                load ? <LoadSpin /> : (
                    <div className='py-8 md:pt-10 flex flex-col gap-5 bg-linear-to-r  from-gray-50 via-amber-50 to-gray-50 '>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl text-yellow-500 font-semibold tracking-wider'>Now_Playing</h1>
                            <div className='flex gap-5 overflow-x-auto'>

                                {
                                    movie && movie?.length > 0 ? (movie?.map((m => (
                                        m.poster_path &&
                                        <Link key={m._id} to={`/movie/${m._id}`}>

                                            <div className=' w-35 h-65  md:w-45 flex-shrink-0 lg:w-55 hover:cursor-pointer shadow-md hover:shadow-2xl hover:translate-x-2 rounded-2xl shadow-yellow-200 transition-all hover:scale-105 duration-300'>
                                                <img src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`} className='rounded-2xl' alt={m?.title} />
                                                <p className='text-sm lg:text-xl font-semibold p-2 truncate'>{m?.title}</p>
                                            </div>
                                        </Link>
                                    )

                                    ))) : <p>No Movies Found</p>
                                }
                            </div>
                        </div>
                        {/* Trending Movies */}
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl text-yellow-500 font-semibold tracking-wider'>Trending Movies </h1>
                            <div className='flex gap-5 overflow-x-auto'>

                                {
                                    trendMovies && trendMovies?.length > 0 ? (trendMovies?.map((m => (
                                        m.poster_path &&
                                        <Link key={m._id} to={`/movie/${m._id}`}>

                                            <div className=' w-35 h-65  md:w-45 lg:w-55 hover:cursor-pointer shadow-md hover:shadow-2xl hover:translate-x-2 rounded-2xl shadow-yellow-200 transition-all hover:scale-105 duration-300'>
                                                <img src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`} className='rounded-2xl' alt={m?.title} />
                                                <p className='text-sm lg:text-xl font-semibold p-2 truncate'>{m?.title}</p>
                                            </div>
                                        </Link>
                                    )

                                    ))) : <p>No Movies Found</p>
                                }


                            </div>
                        </div>
                       

                        {/* Popularity Movies */}

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl text-yellow-500 font-semibold tracking-wider'>Popularity Movies </h1>
                            <div className='flex gap-5 overflow-x-auto'>
                                {
                                    popularity && popularity?.length > 0 ? (popularity?.map((m => (
                                        m.poster_path &&
                                        <Link key={m._id} to={`/movie/${m._id}`}>

                                            <div className=' w-35 h-65  md:w-45 lg:w-55 hover:cursor-pointer shadow-md hover:shadow-2xl hover:translate-x-2 rounded-2xl shadow-yellow-200 transition-all hover:scale-105 duration-300'>
                                                <img src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`} className='rounded-2xl' alt={m?.title} />
                                                <p className='text-sm lg:text-xl font-semibold p-2 truncate'>{m?.title}</p>
                                            </div>
                                        </Link>
                                    )

                                    ))) : <p>No Movies Found</p>
                                }


                            </div>
                        </div>

                             {/* Upcoming */}
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-xl text-yellow-500 font-semibold tracking-wider'>Upcoming Movies </h1>
                            <div className='flex gap-5 overflow-x-auto'>


                                {
                                    upcoming && upcoming?.length > 0 ? (upcoming?.map((m => (
                                        m.poster_path &&
                                        <Link key={m._id} to={`/movie/${m._id}`}>

                                            <div className=' w-35 h-65  md:w-45 lg:w-55 hover:cursor-pointer shadow-md hover:shadow-2xl hover:translate-x-2 rounded-2xl shadow-yellow-200 transition-all hover:scale-105 duration-300'>
                                                <img src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`} className='rounded-2xl' alt={m?.title} />
                                                <p className='text-sm lg:text-xl font-semibold p-2 truncate'>{m?.title}</p>
                                            </div>
                                        </Link>
                                    )

                                    ))) : <p>No Movies Found</p>
                                }


                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default MoviesLayout;
