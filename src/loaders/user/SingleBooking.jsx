import bookingInstance from "../../axioInstances/user/bookingInstance"

const singleBookingLoader = async({params})=>{
    const {id} = params
    try{
       const response = await bookingInstance.get(`/oneticket/${id}`)
       const result = response?.data
       console.log(result)
       return (result.oneBooking)
    }catch(err){
        console.log(err.response?.data?.message)
        return {}
    }
}

export default singleBookingLoader