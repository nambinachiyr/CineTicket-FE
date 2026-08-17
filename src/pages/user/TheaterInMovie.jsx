import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import placeholder from '../../assets/placeholder.png'
import backArrow from "../../assets/left-arrow.png"

const TheaterInMovie = () => {
  const data = useLoaderData()
  const navi = useNavigate()
  const [theaterSearch,setTheaterSearch] = useState('')

  console.log(data)

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
  console.log(selectDate)

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
  console.log(showsByDates)

  const show = validShows[0];
  console.log(show)

  const filteredTheaterShows = showsByDates.filter((show)=>
    show.theater.name.toLowerCase().includes(theaterSearch.toLowerCase().trim()
)
  )


  return (
    <div className='bg-[#0f0f0f] text-white  p-4 min-h-screen'>
      <img onClick={() => navi(-1)} className='p-2 w-10 bg-[#464656] hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-red-500 rounded-full' src={backArrow} alt="" />
     <div className='flex justify-center mt-3'>
       <input
  type="text"
  value={theaterSearch}
  onChange={(e) => setTheaterSearch(e.target.value)}
  placeholder="Search theater name..."
  className="
  w-full md:w-3/4 mx-auto
    lg:w-1/2 
    bg-[#1c1c1c]
    border border-gray-700
    text-white
    placeholder:text-gray-500
    px-4 py-3
    rounded-lg
    focus:outline-none
    focus:border-red-500
  "
/>

     </div>
      {
        validShows.length === 0 ? <p className='flex min-h-screen justify-center items-center text-xl text-gray-700'>No shows ...</p>

          :
          <div className='p-3 tracking-wider lg:grid lg:grid-cols-2 flex flex-col gap-5  md:gap-7'>

            {
              show?.bookingStatus === "Open" && show?.showStatus !== "Completed" ? (
                <div key={show._id} className='flex lg:flex-col justify-center gap-7 items-center text-lg  font-semibold'>
                  <img className='w-30 md:w-50 object-cover md:h-50 lg:h-55 rounded-lg' src={`https://image.tmdb.org/t/p/original${show?.movie?.poster_path}`} alt="Movie Poster" />
                  <h1 className='text-wrap'>{show.movie.title}</h1>
                  <div className='lg:flex flex-wrap hidden text-sm px-20'>
                    {/* calender Section */}
                    {/* implement do did not work the past date */}
                    {

                      removeDuplicates?.map((d, index) => (
                        <p key={d} onClick={() => handleTheaters(d)}
                          className={`w-12 md:px-7 px-5 text-sm md:text-base hover:cursor-pointer  ${d === selectDate ? 'bg-red-600 text-white flex border-red-600' : 'bg-[#1c1c1c] border-gray-700 text-gray-300 hover:border-red-500 hover:text-white transition-all duration-300  scale-90 cursor-pointer'}`}>{d}</p>
                      ))

                    }
                    {/* <p>Check the Dates</p> */}
                  </div>
                </div>

              ) : <p>Booking Closed</p>


            }
            {/* LG:Hidden */}
            <div className='flex flex-wrap lg:hidden md:text-xl px-20'>
              {/* calender Section */}
              {/* implement do did not work the past date */}
              {
                removeDuplicates?.map((d, index) => (
                  <p key={d} onClick={() => handleTheaters(d)}
                    className={`w-12 md:px-7 px-5 text-sm md:text-base  ${d === selectDate ? 'bg-red-600 text-white border-red-600' : 'bg-[#1c1c1c] border-gray-700 text-gray-300 hover:border-red-500 hover:text-white transition-all duration-300  scale-90 cursor-pointer'}`}>{d}</p>
                ))
              }
              {/* <p>Check the Dates</p> */}
            </div>

            {/* Theater Search - Add Here */}
           
            {/* DIsplay the Theater Based on the SelectedDate Default - today */}
            <div className='flex justify-center mt-15  flex-col gap-2 items-center lg:w-full lg:h-35'>
              {
                filteredTheaterShows.length>0?filteredTheaterShows?.map((show, index) => (
                  <div key={show._id} className='border gap-3 bg-[#1c1c1c] flex flex-col justify-center border-gray-800 rounded-xl flex-wrap w-[90%] md:w-[85%] p-4 md:px-6 hover:border-red-500 transition-all'>
                    <p className='flex text-[16px] font-medium text-neutral-100  md:text-lg items-center gap-2 tracking-wide'>{show.theater.name},
                      <span className='flex items-center gap-1 text-gray-400 text-sm'>
                        <img src={placeholder} alt="" className='w-3 h-3 md:w-5 md:h-5' />{(show.theater.address).split(',').at(-1)}</span>
                        </p>
                    <div className=''>
                      {/* Time Section */}
                      {
                        show.showStatus !== "Completed" ?
                          <Link to={`/${show._id}/${show.showDate}/${show.showTime}`} key={index}
                            className='hover:cursor-pointer tracking-normal border border-x-4 text-sm md:border-x-8 justify-center border-green-600 bg-gray-100 transition-all text-gray-900 duration-300 hover:translate rounded-3xl hover:border-gray-50 hover:scale-105 shadow-2xl hover:bg-green-600 hover:text-white w-19 md:w-28 text-center whitespace-nowrap px-1 py-1 flex flex-wrap gap-3'>{show.showTime}</Link>
                          : (
                            <span className='text-sm border border-gray-700 text-gray-500 px-3 py-1 rounded-3xl'>
                              {show.showTime} - Closed
                            </span>
                          )
                      }
                      {/* feature implement status show like changing color and more*/}
                    </div>
                  </div>
                )):<p className='text-center text-white py-5 border border-gray-500 w-full md:w-fit p-4'>No Search theater is available "{theaterSearch}"</p>
              }
            </div>

          </div>
      }
    </div>
  )
}

export default TheaterInMovie