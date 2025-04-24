"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "../types/users"
import { loginUser, registerAdmin, logoutUser } from "../services/authService"
import { getUserById } from "@/services/userService"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id">) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const id = localStorage.getItem("id")
          if (!id) {
            throw new Error("User ID not found in localStorage")
            
          }
          const userData = await getUserById(id)
          setUser(userData)
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error)
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { user: userData, token } = await loginUser(email, password)
      localStorage.setItem("token", token)
      localStorage.setItem("id", userData.id)
      setUser(userData)
      alert("Inicio de sesión exitoso")
      return true
    } catch (error) {
      console.error("Login error:", error)
      alert("Error: Credenciales incorrectas o servicio no disponible")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id">) => {
    try {
      setIsLoading(true)
      await registerAdmin(userData)
      alert("Registro exitoso")
      
      return true
    } catch (error) {
      console.error("Register error:", error)
      alert("Error: No se pudo registrar al administrador")
      
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    logoutUser()
    localStorage.removeItem("token")
    setUser(null)
    alert("Sesión cerrada")
    
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
