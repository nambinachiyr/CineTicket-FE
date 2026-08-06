import axios from "axios"

const bashURL = import.meta.env.VITE_API_URL

const MovieInstance = axios.create({
    baseURL:bashURL + "/movie",
    withCredentials:true
})
export default MovieInstance