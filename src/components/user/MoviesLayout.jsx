import React, { useContext, useEffect, useState } from 'react';
import MovieInstance from '../../axioInstances/user/movieInstance';
import LoadSpin from './LoadSpinButton';
import { Link } from 'react-router-dom';
import { contextValue } from '../../contextvaluses/ContextValue';
import Location from './Location';
import LoadSpinContent from './LoadSpinContent';

const MoviesLayout = () => {
    const [movie, setMovie] = useState([]);
    const [load, setLoad] = useState(false);
    const [trendMovies, setTrendMovies] = useState([]);
    const [popularity, setPopularity] = useState([]);
    const [selectLocation, setSelectLocation] = useState(false);
    const [stateLocation, setStateLocation] = useState(false);
    const [cityLocation, setCityLocation] = useState(false);
    const { contextState, setContextState, contextCity, setContextCity } =
        useContext(contextValue);
    const [loading, setLoading] = useState(false);
    const [movieError, setMovieError] = useState('');

    // Popular Movies Fetching
    async function PopularMovies() {
        try {
            console.log(contextCity);
            const response = await MovieInstance.get(
                `/${contextState?._id}/${contextCity?._id}/popularity`,
            );
            console.log(response?.data?.movies);
            setPopularity(response?.data?.movies);
        } catch (err) {
            console.log(err.message);
            throw err
        }
    }

    // Now_Plaing Movies
    async function moviesFetch() {
        try {
            setLoad(true);
            console.log(contextCity);
            const response = await MovieInstance.get(
                `/${contextState?._id}/${contextCity?._id}/now_playing`,
            );
            console.log(response?.data?.movies);
            setMovie(response?.data?.movies);
        } catch (err) {
            console.log(err.message);

            throw err
        }
        //  finally {
        //   setLoad(false);
        // }
    }

    // Trending movies
    async function trending() {
        try {
            console.log(contextCity);
            const response = await MovieInstance.get(
                `/${contextState?._id}/${contextCity?._id}/toprated`,
            );
            console.log(response?.data?.movies);
            setTrendMovies(response?.data?.movies);
        } catch (err) {
            console.log(err.message);
            throw err
        }
    }

    // Retry movie

    async function loadMovies() {
        try {
            setLoading(true);
            setMovieError('');

            await Promise.all([moviesFetch(), trending(), PopularMovies()]);
        } catch (err) {
            setMovieError(
                !err.response
                    ? 'Network Error. Please check Your Internet Connection.'
                    : err.response?.data?.message || 'Unable to load movies',
            );
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!contextState?._id || !contextCity?._id) return;
        loadMovies()
    }, [contextState, contextCity]);

    console.log(movie.length, 'NOW_PLAYINg');
    console.log(trendMovies.length, 'Trending');
    console.log(popularity.length, 'POPULAR');

    function handleOneCity() {
        setSelectLocation(true);
        setCityLocation(true);
        setStateLocation(false);
    }

    function handleOneState() {
        console.log(':Stet');
        setSelectLocation(true);
        setStateLocation(true);
        setCityLocation(false);
    }

    // Just Changed
    if (!contextState && !contextCity) {
        return (
            <div>
                <LoadSpinContent />
            </div>
        );
    }

    return (
        <div className="reletive">
            <div className="flex items-end justify-end gap-3 text-sm pr-6">
                <p className=" ">📍 {contextCity?.name},</p>
                <p
                    onClick={handleOneState}
                    className="hover:cursor-pointer hover:scale-95 transition-all"
                >
                    {' '}
                    {contextState?.name}
                </p>
            </div>

            <div>
                {selectLocation && (
                    <div className="fixed right-2 md:right-5">
                        <Location
                            stateLocation={stateLocation}
                            setStateLocation={setStateLocation}
                            cityLocation={cityLocation}
                            setCityLocation={setCityLocation}
                        />
                    </div>
                )}

                <div className="py-4 px-1 md:pt-10 flex flex-col gap-5 text-white bg-[#0f0f0f] min-h-screen">
                    {loading && <LoadSpinContent />}
                    {movieError && !loading ? (
                        <div className="flex flex-col min-h-[60vh] justify-center items-center">
                            <p>{movieError}</p>
                            <button className="bg-gray-700 p-3 rounded-lg" onClick={loadMovies}>
                                Retry
                            </button>
                        </div>
                     ) : (<>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl px-2 text-white font-semibold tracking-wider">
                                Now <span className="text-red-500">Playing</span>
                            </h1>
                            <div className="flex gap-5 overflow-x-auto">
                                {/* Now Playing */}

                                {movie && movie?.length > 0 ? (
                                    movie?.map(
                                        (m) =>
                                            m.poster_path && (
                                                <Link key={m._id} to={`/movie/${m._id}`}>
                                                    <div className=" w-32 md:w-40 lg:w-44 bg-[#1c1c1c] justify-center hover:cursor-pointer shadow-md hover:shadow-xl border-red-500 rounded-xl overflow-hidden shadow-gray-400 transition-all hover:-translate-y-1 duration-300">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`}
                                                            className="w-full h-45 mx-auto"
                                                            alt={m?.title}
                                                        />
                                                        <p className="text-sm font-semibold p-3 truncate">
                                                            {m?.title}
                                                        </p>
                                                    </div>
                                                </Link>
                                            )
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        {/* Trending Movies */}
                        <div className="flex flex-col gap-3 ">
                            <h1 className="text-xl px-2 text-white font-semibold tracking-wider">
                                Trending <span className="text-red-500">Movies</span>{' '}
                            </h1>
                            <div className="flex gap-5 overflow-x-auto pb-2">
                                {trendMovies && trendMovies?.length > 0 ? (
                                    trendMovies?.map(
                                        (m) =>
                                            m.poster_path && (
                                                <Link key={m._id} to={`/movie/${m._id}`}>
                                                    <div className=" w-32 md:w-40 lg:w-44 bg-[#1c1c1c] justify-center hover:cursor-pointer shadow-md hover:shadow-xl border-red-500 rounded-xl overflow-hidden shadow-gray-400 transition-all hover:-translate-y-1 duration-300">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`}
                                                            className="w-full h-45 mx-auto"
                                                            alt={m?.title}
                                                        />
                                                        <p className="text-sm lg:text-[15px] font-semibold p-2 truncate">
                                                            {m?.title}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ),
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        {/* Popularity Movies */}

                        <div className="flex flex-col gap-3 ">
                            <h1 className="text-xl px-2 text-white font-semibold tracking-wider">
                                Popularity <span className="text-red-500">Movies</span>{' '}
                            </h1>
                            <div className="flex gap-5 overflow-x-auto pb-4">
                                {popularity && popularity?.length > 0 ? (
                                    popularity?.map(
                                        (m) =>
                                            m.poster_path && (
                                                <Link key={m._id} to={`/movie/${m._id}`}>
                                                    <div className=" w-32 md:w-40 lg:w-44 bg-[#1c1c1c] justify-center hover:cursor-pointer shadow-md hover:shadow-xl border-red-500 rounded-xl overflow-hidden shadow-gray-400 transition-all hover:-translate-y-1 duration-300">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${m?.poster_path}`}
                                                            className="w-full h-45 object-cover mx-auto"
                                                            alt={m?.title}
                                                        />
                                                        <p className="text-sm font-semibold p-1 truncate">
                                                            {m?.title}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ),
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        </>
          )}
                    </div>
            </div>

        </div>
    );
};

export default MoviesLayout;
