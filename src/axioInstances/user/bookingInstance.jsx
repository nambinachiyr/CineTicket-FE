import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const bookingInstance = await axios.create({
    baseURL:baseurl  + '/booking',
    withCredentials:true
})
export default bookingInstance