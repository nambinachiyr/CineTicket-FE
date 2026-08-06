import axios from "axios";

const base_url = import.meta.env.VITE_API_URL

const showInstance = axios.create(
    {
        baseURL:base_url+'/show',
        withCredentials:true
    }
)

export default showInstance