import axios from "axios"

const base_url = import.meta.env.VITE_API_URL
const stateInstance = axios.create({
    baseURL:base_url+'/state',
     withCredentials:true
})

export default stateInstance