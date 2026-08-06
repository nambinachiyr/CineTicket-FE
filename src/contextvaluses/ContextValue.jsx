
import React, { createContext, useEffect, useState } from 'react'
import stateInstance from '../axioInstances/user/stateInstance'
import CityInstance from '../axioInstances/user/cityInstance'
import authInstance from '../axioInstances/user/authInstances'
import theaterAdminInstance from '../axioInstances/theaterAdmin/theaterAdminDash'
export const contextValue = createContext()
// User's
const ContextProvider = ({ children }) => {
  const [contextEmail, setContextEmail] = useState('')
  const [contextUser, setContextUser] = useState(null)
  const [contextRole,setContextRole] = useState('')
  const [contextSearchMovie, setContextSearchMovie] = useState('')
  const [contextMovieData, setContextMovieData] = useState(null)
  const [isContextSearch, setIsContextSearch] = useState(false)
  const [contextMovieLoad, setContextMovieLoad] = useState(false)
  const [contextMovieError, setContextMovieError] = useState('')
  const [contextState, setContextState] = useState(null)
  const [contextCity, setContextCity] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await authInstance.get(`/me`)
        const current = response?.data?.user
        // setContextRole(current?.role)
        setContextUser(current)
        setContextEmail(current?.email)

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()

  }, [])

  useEffect(()=>{
    async function state(){
      const name = 'tamilnadu'
      const response = await stateInstance.get(`/stateName/${name}`)
      console.log(response?.data)
      return setContextState(response?.data?.state)
    }

    async function city(){
      const name = 'chennai'
      const response = await CityInstance.get(`/cityName/${name}`)
      console.log(response?.data)
      return setContextCity(response?.data?.city)
    }
    state()
    city()
  },[])
  
 useEffect(()=>{
    console.log(contextState)
    console.log(contextCity)
    console.log("ContextEmail " ,contextEmail)
 },[contextState,contextCity])


// ---------------------------------------------------------------------------
  // Theater Admin's
  const [contextEmailTA,setContextEmailTA] = useState('')
  const [contextTA,setContextTA] = useState(null)

  useEffect(()=>{
    async function getTheaterAdmin() {
      try{
        const response = await theaterAdminInstance.get('/mee')
        setContextTA(response?.data?.admin)
        setContextEmailTA(response?.data?.admin._id)
      }catch(err){
        console.log(err.response?.data?.message)
      }
    }
    getTheaterAdmin()
  },[])
console.log(contextEmailTA)
  return (
    <contextValue.Provider value={{contextTA,setContextTA,contextEmailTA,setContextEmailTA, contextCity, setContextCity, contextState, setContextState, contextMovieError, setContextMovieError, contextMovieLoad, setContextMovieLoad, isContextSearch, setIsContextSearch, contextMovieData, setContextMovieData, contextSearchMovie, setContextSearchMovie, contextEmail, setContextEmail, contextUser, setContextUser }}>{children}</contextValue.Provider>
  )
}

export default ContextProvider