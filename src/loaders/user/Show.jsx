
import showInstance from "../../axioInstances/user/showInstance"
const showLoader = async({params})=>{
    try{
        const {id} =  params
       const response = await showInstance.get(`/movie/${id}`)
       console.log(response.data)
       return response.data
    }catch(err){
        console.log(err)
        return []
    }
}
export default showLoader