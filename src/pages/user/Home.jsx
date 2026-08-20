import MoviesLayout from '../../components/user/MoviesLayout'
import NavBar from '../../components/user/NavBar'
import Footer from '../../components/user/Footer'
import { useContext } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import SearchMovie from '../../components/user/SearchMovie'

const Home = () => {
  const { isContextSearch} = useContext(contextValue)
  console.log(isContextSearch)
  return (
    < div className='py-3 px-2 flex flex-col w-full overflow-x-hidden bg-[#070a10] text-white min-h-screen'>
      <NavBar />
      <main className='flex-1 w-full'>
        <div className='mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8 lg-px-10 lg:px-10 xl:px-12'>
          {
          isContextSearch?<SearchMovie/>:<MoviesLayout />
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home