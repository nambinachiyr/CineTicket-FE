import React, { useContext, useState } from 'react'
import ticketLogo from "../../assets/ticket1.png"
import contact from "../../assets/contact.png"
import { contextValue } from '../../contextvaluses/ContextValue'
import authInstance from '../../axioInstances/user/authInstances'
import toast from 'react-hot-toast'

const NavbarTA = () => {
    const { contextEmailTA, contextTA } = useContext(contextValue)
    const [openLogout,setOpenLogOut] = useState(false)

    const profileName = contextEmailTA?.charAt(0).toUpperCase() || ""

    function handleProfile(){
        openLogout?setOpenLogOut(false):setOpenLogOut(true)
    }
    async function handleLogOut() {
        try{
            const response = await authInstance.post('/logout')
            console.log(response?.data?.message)
            toast.success(response?.data?.message)
        }catch(err){
            console.log(err.response?.data?.message)
            toast.error(err.response?.data?.message)
        }
    }

    return (
        <div className='bg-[#fdface] rounded-t-xl py-4 px-2'>
            <div className="flex justify-between items-center px-1 ">
                <h1>
                    <img src={ticketLogo} alt="Ticket Logo" className="w-10 h-12 md:w-12 lg:w-22 lg:h-18 object-contain " />
                </h1>
                <h1 className="text-[#ffa216] font-black text-xl lg:text-3xl">Cine Tickets</h1>
                <p onClick={!contextEmailTA ? ()=> navi('/theater-admin/login'):handleProfile} className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 border hover:cursor-pointer rounded-full text-md font-bold text-orange-500 flex justify-center items-center bg-linear-to-r from-amber-400 via-amber-100 to-amber-400">{contextEmailTA ? profileName : <img src={contact} alt=" " className="w-6 lg:w-8" />}</p>
            </div>
            {
                openLogout && <div className=' flex justify-end'><p className='border px-5 py-2 text-orange-500 bg-linear-to-r from-amber-400 via-amber-100 to-amber-400' onClick={handleLogOut}>Logout</p></div>
            }
        </div>
    )
}

export default NavbarTA