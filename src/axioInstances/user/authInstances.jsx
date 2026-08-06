import axios from "axios";
 const BASE_URL = import.meta.env.VITE_API_URL
//  console.log(BASE_URL+'/auth')

const authInstance = axios.create({
    baseURL:BASE_URL+'/auth',
    withCredentials:true,

})


export default authInstance