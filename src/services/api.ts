import axios from "axios"

const USERS_URL = (import.meta.env.USERS_API_URL + import.meta.env.USERS_PORT)

export const api = axios.create({
  baseURL: USERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)
