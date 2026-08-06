import theaterAdminInstance from "../../axioInstances/theaterAdmin/theaterAdminDash"

const theaterLoader = async()=>{
    try{
        const response = await theaterAdminInstance.get('/theater')
        console.log(response?.data)
        return response?.data?.theater || []
    }catch(err){
        console.log(err.response?.data?.message)
        return []
    }
}

export default theaterLoader