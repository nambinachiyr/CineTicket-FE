import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const screenInstance = axios.create({
    baseURL:baseurl+'/screen',
    withCredentials:true
})

export default screenInstance