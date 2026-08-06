import axios from "axios"

const bu = import.meta.env.VITE_API_URL

const paymentInstance = axios.create({
    baseURL:bu+'/payment',
    withCredentials:true
})

export default paymentInstance