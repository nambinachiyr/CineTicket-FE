
import theaterInstance from "../../axioInstances/theaterAdmin/theaterAdminDash"

const Allshows = async()=>{
    try{
       const response = await theaterInstance.get('/allshow')
       return (response?.data?.show || [])
    }catch(err){
        console.log(err.response?.data?.message)
        return[]
    }
}

export default Allshows