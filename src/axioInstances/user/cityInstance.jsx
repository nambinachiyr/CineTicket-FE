import axios from "axios"

const bashURL = import.meta.env.VITE_API_URL

const CityInstance = axios.create({
    baseURL:bashURL + "/city",
    withCredentials:true
})
export default CityInstance