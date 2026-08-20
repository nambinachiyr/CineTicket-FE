import React, { useContext, useEffect, useState } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import stateInstance from '../../axioInstances/user/stateInstance'
import CityInstance from '../../axioInstances/user/cityInstance'
import LoadSpin from '../../components/user/LoadSpinButton'
import close from "../../assets/close (1).png"

const Location = ({selectLocation,setSelectLocation,handleOneState,stateLocation,setStateLocation,cityLocation,setCityLocation}) => {
     const{contextState,setContextState,contextCity,setContextCity} = useContext(contextValue)
      const [stateAll,setStateAll] = useState([])
      const[cityAll,setCityAll] = useState([])
      const [loading,setLoading] = useState(false)
      const [error,setError] = useState('')
      const [cityErr,setCityErr] = useState('')

      const mustSelectCity = cityLocation && !contextCity

      console.log(cityLocation,stateLocation)
     useEffect(()=>{
        async function getAllStates(){
           try{
            setLoading(true)
             const response = await stateInstance.get('/allStates')
             setStateAll(response?.data?.allStates || [])
           }catch(err){
            setError(err.response?.data?.message)
           }
           finally{
            setLoading(false)
           }
        }
        getAllStates()
     },[])
     console.log(stateAll)
     console.log(cityAll)

     useEffect(()=>{
         async function getAllCities(){
            try{
                setLoading(true)
               const response = await CityInstance.get(`/state/${contextState?._id}`)
            //    console.log(response?.data?.cities)
               setCityAll(response?.data?.cities || [])
            }catch(err){
                setError(err.response?.data?.message)
            }
            finally{
                setLoading(false)
            }
        }
        getAllCities()
     },[contextState])

     function handleState(s){
        setContextState(s)
        setContextCity(null)
        setStateLocation(false)
        setCityLocation(true)
     }

     function handleCity(c){
        setContextCity(c) 
        setCityLocation(false)
        setSelectLocation(false)
     }

     function handleClose(){
        if(mustSelectCity) return setCityErr("please select city !")

        setStateLocation(false)
        setCityLocation(false)
        setSelectLocation(false)
     }

  return (
    <>
    {
     selectLocation &&   (
    
    <div className='w-[calc(100vw-80px)] max-w-xl p-1 rounded-2xl border border-white/10 bg-[#111722] shoadow-[0_20px_60px_rgba(0,0,0,0.55) pr-5'>
    
    {
        stateLocation && (
            <div className=' md:min-w-2xl md:p-4 p-2 my-2 bg-[#111722] md:w-120 text-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-5 text-gray-800 tracking-wider'>
                <img onClick={handleClose} className={`border fixed right-0 top-0 border-white/10 m-2 w-5 h-5 invert bg-gray-500 col-span-2 hover:cursor-pointer ${mustSelectCity?"cursor-not-allowed text-gray-700":"hover:bg-gray-600 bg-white/10"}`} src={close} alt="" />
            {
                loading&&<p className='col-span-3'><LoadSpin/></p>
            }
            {
                !loading && error&&<p className='text-sm text-center col-span-3 text-red-400'></p>
            }
       
        {
            stateAll&&stateAll.length>0 &&
            stateAll?.map(s=>(
                <p onClick={()=>handleState(s)} className='hover:text-white text-white hover:bg-red-500 rounded-lg hover:p-1 text-[16px] hover:cursor-pointer' key={s._id}>{s.name}</p>
            ))
        }
    </div>
        )
    }

     {
        cityLocation &&(
        <div className=' md:min-w-2xl md:p-8 p-2 bg-[#111722] md:w-120 justify-center justify-items-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-gray-800 tracking-wider'>
            {
                loading && <p className='col-span-3'><LoadSpin/></p>
            }
            {
                !loading && error && <p className='col-span-3 text-red-500 text-sm'>{error}</p>
            }
       
        {
            cityAll&&cityAll.length>0&&
            cityAll?.map(c=>(
                <p onClick={()=>handleCity(c)} className='hover:text-white text-white hover:bg-red-500 rounded-lg hover:p-1 text-[16px] hover:cursor-pointer' key={c._id}>{c.name}</p>
            ))
        }
    </div>
        )
    }
  </div>
)}
</>

  )
}

export default Location