import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

const theaterAdmin = axios.create({
    baseURL:baseurl+'/tadmin',
    withCredentials:true
})

export default theaterAdmin;