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
      if (email === '') {
        setError("Please Enter Your Email")
      }
      if (password === '') {
        setError("Please Enter Your Password")
      }
      const response = await authInstance.post('/login', { email: email, password: password })
      setUserData(response?.data)
      console.log(response.data)
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
    <div className='flex justify-center items-center min-h-screen rounded-2xl bg-linear-to-b from-yellow-50 via-yellow-200 to-yellow-50'>
      <form onSubmit={handleLogin} className='border hover:border-amber-500 hover:border-2 hover:rounded-t-4xl flex flex-col gap-8 md:gap-15 mx-auto font-semibold w-full max-w-md rounded-xl p-6 md:p-9 bg-gray-100 shadow-yellow-100 shadow-2xl'>
        <h1 className='mx-auto w-fit text-xl md:text-3xl font-bold'>LogIn</h1>
        <div className='flex flex-col md:text-xl space-y-10  justify-center items-center'>
          <input type='email' onBlur={() => setError('')} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='w-full text-center focus:text-left hover:cursor-pointer hover:placeholder-transparent max-w-md px-9  h-11 border border-transparent hover:border-amber-500  hover:rounded-t-4xl focus:outline-none rounded-md focus:border-amber-500 p-4' />
          <input type='password' onBlur={() => setError('')} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='w-full max-w-md px-9 focus:text-left hover:cursor-pointer text-center hover:placeholder-transparent h-11 border border-transparent  hover:border-amber-500  hover:rounded-b-4xl focus:outline-none rounded-md focus:border-amber-500 p-4' />
          {
            error ? <p className='font-light text-sm text-red-500' >{error}</p> : ""
          }
        </div>
        <div className='flex gap-2 items-center justify-center flex-col '>
          <button className='border-transparent w-full py-3 text-md md:text-xl hover:text-white hover:shadow-md shadow-yellow-300 focus:outline-none hover:rounded-4xl rounded-lg hover:bg-amber-300 hover:cursor-pointer'>{loading ? <LoadSpinButton /> : "LogIn"}</button>
          < p className='text-xs font-light text-center'>Create Your Account - <Link to='/signup'><span className='hover:underline text-blue-600 hover:cursor-pointer' > signup</span></Link></p>
        </div>

      </form>
    </div>
  )
}

export default Login