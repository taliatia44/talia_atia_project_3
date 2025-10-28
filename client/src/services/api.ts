import axios from "axios"
const PORT = process.env.PORT || 4000


const api = axios.create({
  baseURL: `http://localhost:${PORT}`, 
  withCredentials: true,
})

export default api
