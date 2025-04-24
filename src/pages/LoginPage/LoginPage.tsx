"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Loader2 } from "lucide-react"
import "./LoginPage.css"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const success = await login(email, password)
    if (success) {
      navigate("/dashboard")
    }
  }*/

    //Armar un handler hardcodeado para el login
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      if (!validateForm()) return
  
      // Simulamos el login exitoso
      setTimeout(() => {
        // Guardamos un token simulado en el localStorage
        localStorage.setItem("token", "fake-token")
        localStorage.setItem("id", "fake-id")
        
        // Redirigimos al Dashboard
        navigate("/dashboard")
      }, 1000)
    }

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">ClassConnect Admin</h1>
          <p className="card-description">Ingresa tus credenciales para acceder al panel de administración</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-content">
            <div className="input-container">
              <label htmlFor="email" className="label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="password" className="label">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="loader" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
