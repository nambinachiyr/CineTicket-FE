
import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import edit from "../../assets/pencils.png"
import close from "../../assets/close (1).png"
import theaterAdminInstance from '../../axioInstances/theaterAdmin/theaterAdminDash'
import toast from 'react-hot-toast'

const AddNewScreen = () => {

        // const { revalidate } = useRevalidator()
        const navi = useNavigate()
        const [name,setName] = useState('')
        const [screenSy,setScreenSy] = useState('')
        const [soundSy,setSoundSy] = useState('')
        const [rows,setRows] = useState()
        const [cols,setCols] = useState()

        async function handleCreateScreen() {
            try {
                const response = await theaterAdminInstance.post(`/create/screen`, { name:name,screenSystem:screenSy,soundSystem:soundSy,rows:rows,cols:cols})
                console.log(response?.data)
                toast.success(response?.data?.message)
                 
                setName('')
                setCols('')
                setRows('')
                setScreenSy('')
                setSoundSy('')
                   
                // revalidate()

            } catch (err) {
                console.log(err.message)
                toast.error(err.response?.data?.message)
            }
        }

        return (
            <div className='flex flex-col md:text-xl gap-7 justify-center md:gap-10 p-5 bg-[#070a10] text-white min-h-screen m-1 rounded-lg'>
                <img onClick={() => navi(-1)} className='w-7 h-7 self-end hover:cursor-pointer' src={close} alt="" />
                <h1 className='text-3xl self-center text-gray-600'>Create Screen</h1>

                <div className={`border md:w-130 self-center border-white/10 text-white bg-[#111722]  p-2 flex flex-col gap-1`}>

                    <div className='text-gray-600 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <h1><span>Name: </span><input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={name} onChange={(e) => setName(e.target.value)} /></h1>
                            <p><span>ScreenSystem: </span> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={screenSy} onChange={(e) => setScreenSy( e.target.value )} /></p>
                            <p><span>SoundSystem: </span> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="text" value={soundSy} onChange={(e) => setSoundSy(e.target.value )} /></p>
                            <p><span>Rows : </span><label htmlFor="Rows"> <input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="Number" value={rows} onChange={(e) => setRows(Number(e.target.value) )} /> </label>
                              <span>Columns : </span><label htmlFor="Columns"><input className='border w-full focus:outline-none border-gray-600 px-2 text-yellow-700 py-1' type="Number" value={cols} onChange={(e) => setCols(Number(e.target.value) )} /> </label>
                            </p>
                            
                        </div>
                        <div className='flex justify-end gap-4 '>
                            <button onClick={()=>navi(-1)} className='border w-23 py-1 text-[17px] font-semibold rounded-xl hover:bg-white/15 border-white/25 text-white hover:cursor-pointer'>Cancel</button>
                            <button onClick={handleCreateScreen} className='border w-23 py-1 text-[17px] font-semibold rounded-xl bg-red-500 border-white/10 hover:bg-red-600 text-white hover:cursor-pointer'>Create</button>
                        </div>
                    </div>
              </div>  </div>
)
}

export default AddNewScreen