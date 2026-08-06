import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const showInstance = axios.create({
    baseURL:baseurl+'/show',
    withCredentials:true
})

export default showInstance