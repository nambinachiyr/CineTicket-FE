import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const theaterInstance = axios.create({
    baseURL:baseurl+'/theater',
    withCredentials:true
})

export default theaterInstance