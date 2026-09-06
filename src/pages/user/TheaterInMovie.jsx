import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import placeholder from '../../assets/placeholder.png'
import backArrow from "../../assets/left-arrow.png"

const TheaterInMovie = () => {
  const data = useLoaderData()
  const navi = useNavigate()
  const [theaterSearch, setTheaterSearch] = useState('')

  // console.log(data)

  function getDate(date) {
    const reverseDate = new Date(date.split('-').reverse().join('-'))
    const monFirst = reverseDate.toLocaleDateString("en-US", {
      month: "short",
      weekday: "short",
      day: "numeric",
    })
    return (monFirst.split(",").reverse().join(' '))
  }

  // Helper Function
  function converToDate(date) {
    const [day, month, year] = date.split('-')

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    )
  }

  const TodayDate = new Date()
  TodayDate.setHours(0, 0, 0, 0)

  const validShows = data?.shows?.filter((show) => {
    const showDate = converToDate(show.showDate)

    return showDate >= TodayDate
  }).
    sort((a, b) => {
      return converToDate(a.showDate) - converToDate(b.showDate)
    }) || []

  const showDates = validShows.map((show) => {
    return getDate(show.showDate)
  })

  let removeDuplicates = [...new Set(showDates)]

  const compareToday = getDate(
    `${String(TodayDate.getDate()).padStart(2, '0')}-${String
      (TodayDate.getMonth() + 1)}-${TodayDate.getFullYear()}`
  )
  const [selectDate, setSelectDate] = useState('')
  const [showsByDates, setShowsByDates] = useState([])

  // Click the Date Function
  function handleTheaters(d) {
    const filterByDate = validShows.filter(show =>
      getDate(show.showDate) === d
    )
    setShowsByDates(filterByDate)
    setSelectDate(d)
    setTheaterSearch('')
  }
  // console.log(selectDate)

  // Set For Default date->Today
  useEffect(() => {
    if (validShows.length === 0) {
      setShowsByDates([])
      setSelectDate('')
      return
    }

    // Check if today has shows
    const todayShows = validShows.filter(show =>
      getDate(show.showDate) === compareToday)

    if (todayShows.length > 0) {
      // Today has Shows
      setShowsByDates(todayShows)
      setSelectDate(compareToday)
    } else {
      // No shows today-> select nearest upcoming date
      const firstDate = getDate(validShows[0].showDate)

      const firstDateShows = validShows.filter(
        show => getDate(show.showDate) === firstDate
      )

      setShowsByDates(firstDateShows)
      setSelectDate(firstDate)
    }
  }, [data?.shows])
  // console.log(showsByDates)

  const show = validShows[0];
  // console.log(show)

  const filteredTheaterShows = showsByDates.filter((show) => {

    if (!show?.theater) return false

    return show?.theater?.name?.toLowerCase().includes(theaterSearch.toLowerCase().trim()
    )
  }
  )

  const groupedShowByTheater = filteredTheaterShows.reduce((acc, show) => {
    const theaterId = show.theater._id
    if (!acc[theaterId]) {
      acc[theaterId] = {
        theater: show.theater,
        shows: []
      }
    }

    acc[theaterId].shows.push(show)
    return acc
  }, {})
  // console.log(groupedShowByTheater)

  return (
    <div className='bg-[#F8FAFC] text-[#111827] px-3 sm:px-5 md:px-8 py-4 min-h-screen'>
      <img onClick={() => navi(-1)} className='p-1 w-6 hover:cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gray-500/20 active:scale-95 rounded-full' src={backArrow} alt="" />
      <div className='flex max-w-4xl mx-auto justify-center my-5'>
        <input
          type="text"
          value={theaterSearch}
          onChange={(e) => setTheaterSearch(e.target.value)}
          placeholder="Search theater name..."
          className="
  w-full  
    bg-gray-500/40
    border border-white/10
    text-neutral-800 font-semibold tracking-wide text-sm
    placeholder:text-gray-500
    px-4 py-3
    rounded-xl
    focus:outline-none
    focus:border-red-500/50
    sm:text-base
  "
        />


      </div>
      {
        validShows.length === 0 ? <p className='flex min-h-screen justify-center items-center text-xl text-gray-700'>No upcoming shows are available for this movie ...</p>

          :
          <div className=' mx-auto '>
            <div className='md:flex md:my-17 md:justify-center items-start'>
              <div className='flex flex-col items-center gap-5'>

                <div key={show?._id} className='flex md:flex-col gap-3 items-center text-lg  font-semibold'>
                  <img className='w-30 md:w-50 object-cover md:h-50 lg:h-55 rounded-lg' src={`https://image.tmdb.org/t/p/original${show?.movie?.poster_path}`} alt={show?.movie?.title || "Movie Poster"} />
                  <h1 className='text-wrap max-w-xs text-center text-base font-bold sm:text-lg lg:text-xl text-red-600'>{show?.movie?.title || "Movie"}</h1>
                </div>
              </div>

              <div className='flex flex-wrap my-8 sm:my-15 items-center justify-center gap-2 md:text-xl px-20'>

                {
                  removeDuplicates?.map((d) => (
                    <p key={d} onClick={() => handleTheaters(d)}
                      className={`w-12 md:px-7 px-5 text-sm md:text-base  ${d === selectDate ? 'bg-red-600 text-white border-red-600' : 'bg-[#1c1c1c] border-gray-700 text-gray-300 hover:border-red-500 hover:text-white transition-all duration-300  scale-90 cursor-pointer'}`}>{d}</p>
                  ))
                }
                {/* <p>Check the Dates</p> */}
              </div>
            </div>


            {/* DIsplay the Theater Based on the SelectedDate Default - today */}
            <div className={`grid mx-auto grid-cols-1 ${Object.values(groupedShowByTheater).length<=1?'lg:grid-cols-1 lg:justify-items-center':'lg:grid-cols-2'} justify-items-center lg:mt-15  flex-col gap-2 lg:w-full `}>
              {
                Object.values(groupedShowByTheater).length > 0 ? (
                   Object.values(groupedShowByTheater).map((group) => (
                    <div key={group.theater?._id} className='border gap-3 py-4 bg-[#1c1c1c] flex flex-col justify-center border-gray-800 rounded-xl flex-wrap w-[90%] md:w-[85%] p-2 md:px-6 hover:border-red-500 transition-all'>
                      <p className='flex text-[16px] font-medium text-neutral-100  md:text-lg items-center gap-2 tracking-wide'>{group.theater?.name},
                        <span className='flex items-center gap-1 text-gray-400 text-sm'>
                          <img src={placeholder} alt="" className='w-3 h-3 md:w-5 md:h-5' />{(group.theater?.address)?.split(',').at(-1) || "Location is not available"}</span>
                      </p>
                      <div className=''>
                        {/* Time Section */}
                        <div className='flex flex-wrap gap-3'>
                          {
                            group.shows?.map(show => (show.bookingStatus === 'Open' &&
                              show.showStatus !== "Completed" ?
                              <Link key={show._id} to={`/${show._id}/${show.showDate}/${show.showTime}`}
                                className='border-l-4 active:scale-95 border-r-4 hover:border-gray-100 px-3 py-1 hover:bg-green-600 hover:text-white transition-all border-green-600  bg-gray-100 text-gray-900 text-sm rounded-3xl '>
                                {show.showTime}
                              </Link> :
                              <p key={show._id} className='border-l-4 border-r-4 hover:border-gray-100 px-3 py-1 hover:bg-gray-600 hover:text-white transition-all border-gray-600  bg-gray-100 text-gray-900 text-sm rounded-3xl hover:cursor-not-allowed'>{show.showTime}</p>
                            ))
                          }
                        </div>
                        {/* feature implement status show like changing color and more*/}
                      </div>
                    </div>
                  ))
                ) : <p className='text-center text-gray-800 border-gray-500 w-full md:w-fit p-4'>No Search theater is available "{theaterSearch}"</p>
              }
            </div>

          </div>
      }
    </div>
  )
}

export default TheaterInMovie