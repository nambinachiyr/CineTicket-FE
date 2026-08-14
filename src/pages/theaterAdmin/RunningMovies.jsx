import close from "../../assets/close (1).png"

const RunningMovies = ({runningMovies}) => {
  console.log(runningMovies)
  return (
          <div className='flex flex-col md:text-xl gap-7 justify-center md:gap-10 p-5 bg-[#0f0f0f] text-gray-200 min-h-screen m-1 rounded-lg'>
              <img src={close} onClick={()=>navi(-1)} className='w-7 h-7 self-end hover:scale-100 hover:cursor-pointer' alt='close' />
              <h1 className='text-xl self-center text-gray-400'>All Movies Available here</h1>
              
          </div>
      )
  }

export default RunningMovies