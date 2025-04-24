"use client"

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext" // 🔒 Comentado para evitar lógica de backend
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { isAuthenticated, isLoading } = useAuth() // 🔒 Comentado mientras no hay backend

  // 🚧 Hardcode: verificamos si hay token en localStorage
  const token = localStorage.getItem("token")
  const isAuthenticated = !!token
  const isLoading = false // ⚡️ Simulamos que no hay delay de carga

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
