import React, { useContext, useEffect, useState } from 'react'
import { contextValue } from '../../contextvaluses/ContextValue'
import stateInstance from '../../axioInstances/user/stateInstance'
import CityInstance from '../../axioInstances/user/cityInstance'

const Location = ({stateLocation,setStateLocation,cityLocation,setCityLocation}) => {
     const{contextState,setContextState,contextCity,setContextCity} = useContext(contextValue)
      const [stateAll,setStateAll] = useState([])
      const[cityAll,setCityAll] = useState([])

      console.Log(cityLocation,stateLocation)
     useEffect(()=>{
        async function getAllStates(){
           try{
             const response = await stateInstance.get('/allStates')
             setStateAll(response?.data?.allStates)
           }catch(err){
            console.log(err.response?.data?.message)
           }
        }
        getAllStates()
     },[])
     console.log(stateAll)
     console.log(cityAll)

     useEffect(()=>{
         async function getAllCities(){
            try{
               const response = await CityInstance.get(`/state/${contextState?._id}`)
               console.log(response?.data?.cities)
               setCityAll(response?.data?.cities)
            }catch(err){
                console.log(err.response?.data?.message)
            }
        }
        getAllCities()
     },[contextState])

     function handleState(s){
        setContextState(s)
        setStateLocation(false)
        setCityLocation(true)
     }

     function handleCity(c){
        setContextCity(c) 
        setCityLocation(false)
     }

    console.log(cityAll)
     console.log(contextState)
     console.log(contextCity)
  return (
    <>
   
    {
        stateLocation && (
        <div className=' md:min-w-2xl md:p-8 p-2  bg-yellow-500/99 md:w-120 justify-center justify-items-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-gray-800 tracking-wider'>
       
        {
            stateAll&&stateAll.length>0?
            stateAll?.map(s=>(
                <p onClick={()=>handleState(s)} className='hover:text-white hover:bg-black/50 rounded-lg hover:p-1 text-[17px] hover:cursor-pointer' key={s._id}>{s.name}</p>
            )):<p className='text-xl text-red-500'>No State ...</p>
        }
    </div>
        )
    }

     {
        cityLocation &&(
        <div className=' md:min-w-2xl md:p-8 p-2  bg-yellow-500/99 md:w-120 justify-center justify-items-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-gray-800 tracking-wider'>
       
        {
            cityAll&&cityAll.length>0?
            cityAll?.map(c=>(
                <p onClick={()=>handleCity(c)} className='hover:text-white hover:bg-black/50 rounded-lg hover:p-1 text-[17px] hover:cursor-pointer' key={c._id}>{c.name}</p>
            )):<p className='text-xl text-red-500'>No Cities...</p>
        }
    </div>
        )
    }
  </>
  )
}

export default Location