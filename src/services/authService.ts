import { api } from "./api"

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/admin-login", { email, password })
  console.log("Url de la petición:", response.config.url);
  console.log("Login response:", response.data)
  return response.data
}

export const registerAdmin = async (email:string, name: string, password: string) => {
  const response = await api.post("/admins", { email, name, password },{
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
  return response.data
}


export const logoutUser = () => {
  // Limpiar cualquier estado local si es necesario
}
