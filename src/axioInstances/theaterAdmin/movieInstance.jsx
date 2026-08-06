import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL
const movieInstance = axios.create({
    baseURL:baseurl+'/movie',
    withCredentials:true
})

export default movieInstance