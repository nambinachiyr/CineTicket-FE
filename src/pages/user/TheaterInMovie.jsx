import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import placeholder from '../../assets/placeholder.png'
import backArrow from "../../assets/left-arrow.png"

const TheaterInMovie = () => {
  const data = useLoaderData()
  const navi = useNavigate()
  console.log(data)
  
     function getDate(date){ 
       const reverseDate = new Date(date.split('-').reverse().join('-'))
       const monFirst =  reverseDate.toLocaleDateString("en-US",{
         month:"short",
         weekday:"short",
        day:"numeric",
      })
      return (monFirst.split(",").reverse().join(' '))
    }
  
  // Dates
   const showDates = data?.shows?.map((show)=>{
    const date = show.showDate

    const dates = getDate(date)
    console.log(dates)
    return dates
    
  }
  
)
let removeDuplicates = [...new Set(showDates)]
const today = new Date()
const dayMon = today.toLocaleDateString("en-US",{
  month:"short",
  day:"numeric",
  weekday:"short"
})
const compareToday = dayMon.split(',').reverse().join(' ')
const [selectDate,setSelectDate] = useState(compareToday)
const [showsByDates,setShowsByDates] = useState([])

  // Click the Date Function
 function handleTheaters(d){
     const filterByDate = data?.shows.filter(show=>
     getDate(show.showDate) === d
     )
     setShowsByDates(filterByDate)
     setSelectDate(d)
  }
console.log(selectDate)
  // Set For Default date->Today
  useEffect(()=>{
    const filtered = data?.shows?.filter(show=>
      getDate(show.showDate) === compareToday
    )

    setShowsByDates(filtered)
    console.log(filtered)
  },[data?.shows])
  console.log(showsByDates)
  return (
    <div className='bg-[#fdfdf6] p-4'>
     <img onClick={()=>navi(-1)} className='p-2 hover:cursor-pointer transition-all duration-300 hover:scale-75 hover:bg-amber-100 rounded-full' src={backArrow} alt="" />
     {
      !data?.show && <p className='flex min-h-screen justify-center items-center text-xl text-gray-700'>No shows ...</p>

     }
    <div className='p-3 tracking-wider flex flex-col gap-5  md:gap-7'>

      {
        data?.shows?.map((show)=>(
         show?.bookingStatus==="Open"?(
           <div key={show._id} className='flex justify-center gap-7 items-center text-xl md:text-2xl  font-semibold'>
            <img className='w-30 md:w-[50%] object-cover md:h-50 lg:h-55 rounded-lg' src={`http://image.tmdb.org/t/p/original${show?.movie?.poster_path}`} alt="Movie Poster" />
            <h1 className='text-wrap'>{show.movie.title}</h1>
          </div>

         ):<p>Booking Closed</p>
        ))

      }
      <div className='flex flex-wrap md:text-xl px-20'>
        {/* calender Section */}
        {/* implement do did not work the past date */}
        {
          removeDuplicates?.map((d,index )=>(
            <p key={d}  onClick={()=>handleTheaters(d)} className={`w-12 md:px-7 px-5 text-sm flex justify-center items-center py-1  border shadow-lg lg:text-2xl border-amber-50 text-center bg-gray-200 rounded-sm hover:text-yellow-600 transition-all duration-300  hover:scale-90 hover:bg-yellow-300 text-yellow-700 ${d===selectDate?'bg-yellow-300 text-yellow-600 transition-all duration-300  scale-90 cursor-pointer':'hover:cursor-pointer focus:bg-yellow-300 focus:text-yellow-600 focus:scale-90'}`}>{d}</p>
          ))
        }
        {/* <p>Check the Dates</p> */}
      </div>
      {/* DIsplay the Theater Based on the SelectedDate Default - today */}
      <div className='flex justify-center'>
        {
          showsByDates?.map((show,index)=>(
            <div key={show._id} className='border gap-5 bg-gray-200 flex flex-col justify-center border-gray-400 rounded-xs flex-wrap w-[90%] md:w-[85%] p-2 md:px-6 md:py-6'>
            <p  className='flex text-[16px] font-medium text-neutral-800  md:text-lg items-center gap-2 lg:text-3xl tracking-wide'>{show.theater.name}, <span className='flex items-center'><img src={placeholder} alt="" className='w-3 h-3 md:w-5 md:h-5' />{(show.theater.address).split(',').at(-1)}</span></p>
            <div>
              {/* Time Section */}
              {
                show.showStatus!=="Completed"?<Link to={`/${show._id}/${show.showDate}/${show.showTime}`} key={index} className='hover:cursor-pointer tracking-normal border border-x-4 text-sm md:border-x-8  bg-gray-100 transition-all duration-300 hover:translate hover:scale-105 shadow-2xl border-green-600 w-19 md:w-35 text-center whitespace-nowrap md:text-xl md:px-4 px-1 py-1 md:py-3 flex flex-wrap gap-3'>{show.showTime}</Link>:""
              }
              {/* feature implement status show like changing color and more*/}
            </div>
            </div>
          ))
        }
      </div>

    </div>
    </div>
  )
}

export default TheaterInMovie