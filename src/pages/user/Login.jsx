import React, { useContext, useState } from 'react'
import { data, Link, useLocation, useNavigate } from 'react-router-dom'
import authInstance from '../../axioInstances/user/authInstances'
import LoadSpinButton from '../../components/user/LoadSpinButton'
import toast from 'react-hot-toast'
import { contextValue } from '../../contextvaluses/ContextValue'

const Login = () => {
  const Navi = useNavigate()
  const location = useLocation()
  const { contextEmail, setContextEmail,setContextUser,contextUser } = useContext(contextValue)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [userData, setUserData] = useState('')

  // This is for where the login page open return to that same page or Home page
  const from = location.state?.from || '/'

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (!email) {
        setLoading(false)
        return setError("Please Enter Your Email")
      }
      if (!password) {
        setLoading(false)
       return setError("Please Enter Your Password")
      }
      const response = await authInstance.post('/login', { email: email, password: password })
      setUserData(response?.data)
      // console.log(response.data)
      setContextUser(response?.data?.existUser)
      setContextEmail(response?.data?.existUser?.email)
      
      toast.success(response?.data?.message)
      setEmail('')
      setPassword('')
      setError('')
      setTimeout(() => {
        Navi(from, { replace: true })
      }, 1000)

    } catch (err) {
      setError(err.response?.data?.message)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className='flex justify-center tracking-widest text-white items-center min-h-screen rounded-2xl px-4 py-8 bg-[#070a10]'>
      <form onSubmit={handleLogin} className='border hover:border-white/10 bg-[#111722] max-w-[310px] sm:max-w-sm rounded-2xl flex flex-col mx-auto gap-10 font-semibold w-full sm:p-3 px-2 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.35)]'>
        <h1 className='mx-auto w-fit text-xl md:text-3xl font-bold'>LogIn</h1>
        <div className='flex flex-col md:text-xl space-y-10  justify-center items-center'>
          <input type='email' onBlur={() => setError('')} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='w-full text-center focus:text-left hover:cursor-pointer bg-[#0b0f17]  hover:placeholder-text-gray-600 focus:border-red-500/60 max-w-md px-9  h-11 border border-transparent  focus:outline-none rounded-md  p-4' />
          <input type='password' onBlur={() => setError('')} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='w-full max-w-md px-9 focus:text-left hover:cursor-pointer bg-[#0b0f17]  hover:placeholder-text-gray-600 focus:border-red-500/60 text-center hover:placeholder-transparent h-11 border border-transparent focus:outline-none rounded-md p-4' />
          {
            error ? <p className='font-light text-sm text-red-500' >{error}</p> : ""
          }
        </div>
        <div className='flex gap-2 items-center justify-center flex-col '>
          <button disabled={loading} className='border-transparent py-3 text-md font-bold tracking-[0.1em] md:text-xl hover:bg-red-500 w-[90%] text-white hover:shadow-mdfocus:outline-none hover:rounded-4xl rounded-lg disabled:cursor-not-allowed disabled:bg-gray-700  hover:cursor-pointer'>{loading ? <LoadSpinButton /> : "LogIn"}</button>
          < p className='text-xs font-light text-center my-2'>Create Your Account - <Link to='/signup'><span className='hover:underline text-blue-600 hover:cursor-pointer' > signup</span></Link></p>
        </div>

      </form>
    </div>
  )
}

export default Login