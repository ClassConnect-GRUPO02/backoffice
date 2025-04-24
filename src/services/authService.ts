import type { User } from "../types/users"
import { api } from "./api"

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password })
  return response.data
}

export const registerAdmin = async (userData: Omit<User, "id">) => {
  const response = await api.post("/users", userData)
  return response.data
}


export const logoutUser = () => {
  // Limpiar cualquier estado local si es necesario
}
