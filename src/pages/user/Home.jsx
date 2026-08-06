import MoviesLayout from '../../components/user/MoviesLayout'
import NavBar from '../../components/user/NavBar'
import Footer from '../../components/user/Footer'
import { useContext } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import SearchMovie from '../../components/user/SearchMovie'

const Home = () => {
  const { isContextSearch,setIsContextSearch} = useContext(contextValue)
  console.log(isContextSearch)
  return (
    < div className='py-3 px-2 flex flex-col  min-h-screen'>
      <NavBar />
      <main className='flex-1'>
        {
          isContextSearch?<SearchMovie/>:<MoviesLayout />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Home