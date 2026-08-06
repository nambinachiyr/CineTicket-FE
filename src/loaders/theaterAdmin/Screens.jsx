import screenInstance from "../../axioInstances/theaterAdmin/screenInstance"
import theaterInstance from "../../axioInstances/theaterAdmin/theaterAdminDash"

const screens = async()=>{
    try{
       const reponse = await theaterInstance.get('/allscreen')
       return (reponse?.data?.screen)
    }catch(err){
        console.log(err.message)
        return[]
    }
}

export default screens