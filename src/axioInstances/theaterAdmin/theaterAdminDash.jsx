import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const theaterAdminInstance = axios.create({
    baseURL:baseurl+'/tadashboard',
    withCredentials:true
})

export default theaterAdminInstance