
import React from 'react'
import NavbarTA from '../../components/theaterAdmin/NavbarTA'
import MainDashBoradTA from '../../components/theaterAdmin/MainDashBoradTA'
import FooterAT from '../../components/theaterAdmin/FooterTA'

const HomeTA = () => {
  return (
    <div className='flex flex-col rounded-2xl m-1 bg-[#a6cfff] min-h-screen'>
      <NavbarTA />
      <div className='flex-1'>
        <MainDashBoradTA />
      </div>
      <FooterAT />
    </div>
  )
}

export default HomeTA