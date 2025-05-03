"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Loader2 } from "lucide-react"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { login, isLoading } = useAuth()
  const [generalError, setGeneralError] = useState<string | null>(null)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El email es requerido"
    } /*else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }*/

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null) // Resetear errores generales al inicio

    if (!validateForm()) return

    try {
      const success = await login(email, password)
      if (success) {
        navigate("/dashboard") // ✅ CA 1: Login exitoso
      } else {
        setGeneralError("Credenciales incorrectas.") // ⚠️ CA 2: Login fallido por credenciales
      }
    } catch (error) {
      setGeneralError("Error del servidor. Intenta nuevamente más tarde.") // ⚠️ CA 2: Login fallido por error de servicio
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>ClassConnect Admin</h1>
          <p className={styles.cardDescription}>Ingresa tus credenciales para acceder al panel de administración</p>
        </div>

        {generalError && (
          <div className={styles.errorAlert}>
            <p>{generalError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.cardContent}>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.label}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="text"
                placeholder="admin@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              />
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>
          </div>

          <div className={styles.cardFooter}>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className={styles.loader} />
                  <span>Iniciando sesión...</span>
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
