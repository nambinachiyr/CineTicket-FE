import React, { useContext, useEffect, useState } from 'react';
import MovieInstance from '../../axioInstances/user/movieInstance';
import { Link } from 'react-router-dom';
import { contextValue } from '../../contextvaluses/ContextValue';
import Location from './Location';
import LoadSpinContent from './LoadSpinContent';
import MovieCards from './MovieCards';

const MoviesLayout = () => {
    const [movie, setMovie] = useState([]);
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

        // console.log(contextCity);
        const response = await MovieInstance.get(
            `/${contextState?._id}/${contextCity?._id}/popularity`,
        );
        // console.log(response?.data?.movies);
        setPopularity(response?.data?.movies || []);

    }

    // Now_Playing Movies
    async function moviesFetch() {

        const response = await MovieInstance.get(
            `/${contextState?._id}/${contextCity?._id}/now_playing`,
        );
        // console.log(response?.data?.movies);
        setMovie(response?.data?.movies || []);

    }

    // Trending movies
    async function trending() {


        const response = await MovieInstance.get(
            `/${contextState?._id}/${contextCity?._id}/toprated`,
        );
        // console.log(response?.data?.movies);
        setTrendMovies(response?.data?.movies || []);

    }

    // Retry movie
    //  LOAD ALL MOVIES
    async function loadMovies() {
        try {
            setLoading(true);
            setMovieError('');

            await Promise.all(
                [moviesFetch(),
                trending(),
                PopularMovies()]);
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


    function handleOneCity() {
        setSelectLocation(true);
        setCityLocation(true);
        setStateLocation(false);
    }

    function handleOneState() {
        selectLocation ? setSelectLocation(false) : setSelectLocation(true);
        setStateLocation(true);
        setCityLocation(false);
    }

    // Just Changed

    return (
        <div className="reletive flex w-full flex-col gap-7">
            <div className="flex justify-end ">
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
               <div className='fixed inset-0 z-40 w-full bg-black/60 backdrop-blur-[0.2]'>
                    <div className="fixed top-45  backdrop-blur-lg z-80 right-10 md:right-15">
                        <Location
                            stateLocation={stateLocation}
                            setStateLocation={setStateLocation}
                            cityLocation={cityLocation}
                            setCityLocation={setCityLocation}
                            handleOneState = {handleOneState}
                            setSelectLocation={setSelectLocation}
                            selectLocation={selectLocation}
                        />
                    </div>
               </div>
                )}

                {/* Loading */}
                {
                    loading && (
                        <div className='flex min-h-[45vh] items-center backdrop-blur-lg  justify-center'><LoadSpinContent /></div>
                    )
                }

                {/* Error */}

                {
                    !loading && movieError && (
                        <div className='flex min-h-[45vh] items-center justify-center'>
                            <div className='text-center'>
                                <p className='text-sm text-gray-300'>{movieError}</p>
                                <button className='mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold'>Retry</button>
                            </div>
                        </div>

                    )
                }

                {
                    !loading && !movieError && (
                        <>
                            <div className="flex flex-col gap-3">
                                <h1 className="text-xl px-2 text-white font-semibold tracking-wider">
                                    Now <span className="text-red-500">Playing</span>
                                </h1>
                                <div className="flex gap-5 overflow-x-auto">
                                    {/* Now Playing */}

                                    {movie && movie?.length > 0 ? (
                                        movie?.map(
                                            (movieData) => (<MovieCards movieData={movieData} />

                                            ))) : (
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
                                            (movieData) => (<MovieCards movieData={movieData} />

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
                                            (movieData) => (<MovieCards movieData={movieData} />

                                            ),
                                        )
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>


                        </>)}
            </div>
        </div>
    
        
    );
};

export default MoviesLayout;
