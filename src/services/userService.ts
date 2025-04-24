import type { User, UserFilters } from "../types/users"
import { api } from "./api"

export const getUsers = async (filters?: UserFilters) => {
  const response = await api.get("/users", { params: filters })
  return response.data
}

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: string, userData: Partial<User>) => {
  const response = await api.put(`/users/${id}`, userData)
  return response.data
}


export const getAuditLogs = async (userId?: string) => {
  const response = await api.get("/audit-logs", { params: { userId } })
  return response.data
}
