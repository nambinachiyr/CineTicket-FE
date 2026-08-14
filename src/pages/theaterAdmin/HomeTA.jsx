
import React from 'react'
import NavbarTA from '../../components/theaterAdmin/NavbarTA'
import MainDashBoradTA from '../../components/theaterAdmin/MainDashBoradTA'

const HomeTA = () => {
  return (
    <div className='flex flex-col rounded-2xl m-1 bg-gray-500 min-h-screen'>
      <NavbarTA />
      <div className='flex-1'>
        <MainDashBoradTA />
      </div>
      {/* <FooterAT /> */}
      {/* work later */}
    </div>
  )
}

export default HomeTA