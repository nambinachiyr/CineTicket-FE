
import showInstance from "../../axioInstances/user/showInstance"
const showLoader = async({params})=>{
    try{
        const {id,stateId,cityId} =  params
       const response = await showInstance.get(`/movie/${id}/${stateId}/${cityId}`)
       console.log(response.data)
       return response.data
    }catch(err){
        console.log("STATUS ",err.response?.status)
        console.log("BACKEND MSG",err.response?.data)
        console.log("URL ",err.config?.url)
        return []
    }
}
export default showLoader