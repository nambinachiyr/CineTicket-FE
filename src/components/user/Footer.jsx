import React, { useContext, useEffect, useState } from 'react'
import ticket from '.../../../src/assets/ticket1.png'
import { Link, useNavigate } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import PrivacyPolicy from './PrivacyPolicy'
import Term_Conditions from './Terms&Conditions'
import { contextValue } from '../../contextvaluses/ContextValue'
import theaterAdmin from '../../axioInstances/theaterAdmin/theaterAdminInstance'


const Footer = () => {
  const {contextEmail,contextEmailTA} = useContext(contextValue)
  const [isAdmin,setIsAdmin] = useState(false)
  const navi = useNavigate()
  const [isShow,setIsShow] = useState(false)
  const [isAbout,setIsAbout] = useState(false)
  const [isContact,setIsContact] = useState(false)
  const [isPrivacy,setIsPrivacy] = useState(false)
  const [isT_C,setIsT_C] = useState(false)
  function showAbout(){
    !isAbout?setIsAbout(true):setIsAbout(false)
  }
  function showContact(){
    !isContact?setIsContact(true):setIsContact(false)
  }
  function showPrivacy(){
    !isPrivacy?setIsPrivacy(true):setIsPrivacy(false)
  }
  function showT_C(){
    !isT_C?setIsT_C(true):setIsT_C(false)
  }

  useEffect(()=>{
    async function checkAdmin() {
      if(!contextEmail){
        console.log("No Context admin")
        return setIsAdmin(false)
      }
 console.log("This Is THe Footer Call fro TheaterAdmin")
        try{
          console.log("Tring to call this")
           const response = await theaterAdmin.get(`/email/${contextEmail}`)
           console.log("response",response.data)
           console.log("Stsuts",response.status)
           const admin = response.data?.adminDetails
           if(admin?.isActive){
              console.log(":ADMIN")
             setIsAdmin(true)
           }else{
            console.log("No")
            setIsAdmin(false)
           }
            
          }catch(err){
           console.log("err",err.response?.data)
           console.log("ERR",err.response?.status)
           setIsAdmin(false)
        }
    }

    checkAdmin()
  },[contextEmail])
  

  async function handleTheaterAdmins(){
       
          if(isAdmin){
            navi('/theater-admin/login')
          }

  }
  return (
    <>
      
    <div className='text-sm relative bg-yellow-100 mt-1 rounded-2xl text-gray-600 p-5 flex flex-col gap-3'>
      {isAbout&&<About setIsAbout={setIsAbout}/>}
      {isContact&&<Contact setIsContact={setIsContact}/>}
      {isPrivacy&&<PrivacyPolicy setIsPrivacy={setIsPrivacy}/>}
      {isT_C&&<Term_Conditions setIsT_C={setIsT_C}/>}
      <h1 className='flex items-center font-bold justify-center gap-1 border-dashed text-lg'><img src={ticket} alt="Ticket Logo" className='w-10' />Cine Tickets</h1>
      <div className='grid grid-cols-2  gap-3 justify-items-center md:grid-cols-3 lg:grid-cols-5 font-semibold'>
        <Link to={'/'} className='hover:text-yellow-500 hover:scale-105 transition-all duration-300'>Home</Link>
        <Link className='hover:text-yellow-500 hover:scale-103 transition-all duration-300'>Movies</Link>
        <p onClick={handleTheaterAdmins} className={isAdmin?' hover:text-yellow-500 hover:scale-103 transition-all duration-300':'hover:cursor-not-allowed'}>Theaters</p>
        <p onClick={showAbout} className='hover:text-yellow-500 hover:cursor-pointer hover:scale-103 transition-all duration-300'>About</p>
        <p onClick={showContact} className='hover:text-yellow-500 hover:cursor-pointer hover:scale-103 transition-all duration-300'>Contact</p>
      </div>
      <div className='flex flex-wrap gap-2 justify-center items-center'>
       <Link onClick={showPrivacy}  className='hover:text-yellow-600'> Privacy policy</Link> <span>| </span><Link onClick={showT_C}  className='hover:text-yellow-600'>Terms & Conditions</Link>
        </div>
      <div className='text-center text-xs text-gray-800'>
        © 2026 Cine Tickets. All Rights Reserved.
      </div>
    </div>
    </>
  )
}

export default Footer