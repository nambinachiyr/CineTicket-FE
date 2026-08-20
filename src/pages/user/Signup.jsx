import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authInstance from '../../axioInstances/user/authInstances'
import LoadSpin from '../../components/user/LoadSpinButton'
import toast from 'react-hot-toast'

const Signup = () => {
  const Navi = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [userDetail, setUserDetail] = useState('')
  const [successMSG, setSuccessMSG] = useState('')
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await authInstance.post('/signup', { name: userName, email: email, password: password })
      console.log(response?.data)
      if (!(response?.data?.success)) {
        return setError(response?.data?.message)
      }
      setUserDetail(response?.data?.newUser)
      toast.success(response?.data?.message)
      setEmail('')
      setPassword('')
      setUserName('')
      setTimeout(() => {
        Navi('/')

      }, 1000)


    } catch (err) {
      setError(err.response?.data?.message)
      console.log(err.message)

    }
    finally {
      setLoading(false)
    }

  }
  console.log(userDetail)
  console.log(error)

  return (
    <div className='flex justify-center items-center min-h-screen rounded-2xl bg-[#070a10] tracking-wider px-4 py-8 text-white'>
      <form onSubmit={handleSignup} className='border hover:border-white/10 flex flex-col gap-8 md:gap-15 mx-auto font-semibold w-30% rounded-xl p-6 md:p-9 bg-[#111722] w-full maw-w-[300px] sm:max-w-sm shadow-[0_20px_rgba(0,0,0,0.35)]'>
        <h1 className='mx-auto w-fit text-xl md:text-3xl font-bold'>Create Account</h1>
        <div className='flex flex-col md:text-xl space-y-10  justify-center items-center'>
          <input type='name' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Your Name' className='w-full text-center focus:text-left hover:cursor-pointer hover:placeholder-transparent bg-[#0b0f17] max-w-md px-9  h-11 border border-white/10 hover:border-red-500  hover:rounded-t-4xl focus:outline-none rounded-md focus:border-red-500 p-4' />
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='w-full text-center focus:text-left hover:cursor-pointer hover:placeholder-transparent bg-[#0b0f17] max-w-md px-9  h-11 border border-white/10 hover:border-red-500  hover:rounded-t-4xl focus:outline-none rounded-md focus:border-red-500 p-4' />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='w-full max-w-md px-9 focus:text-left hover:cursor-pointer text-center bg-[#0b0f17] hover:placeholder-transparent h-11 border border-white/10  hover:border-red-500  hover:rounded-b-4xl focus:outline-none rounded-md focus:border-red-500 p-4' />
        </div>
        {
          error ? <p className='text-center text-sm font-light text-red-500'>{error}</p> : ""
        }
        <div className='flex gap-2 items-center justify-center flex-col '>
          <button className='border-transparent w-full py-3 text-md md:text-xl hover:text-white hover:shadow-xs shadow-red-300 focus:outline-none hover:rounded-4xl rounded-lg hover:bg-red-500 hover:cursor-pointer'>{loading ? <LoadSpin /> : "Signup"}</button>
          < p className='text-xs font-light text-center'>Do you have an account - <Link to='/login'><span className='hover:underline text-blue-600 hover:cursor-pointer'> login</span></Link></p>
        </div>
      </form>
    </div>
  )
}

export default Signup