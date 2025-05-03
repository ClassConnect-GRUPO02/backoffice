"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/DashboardLayout"
import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"
import { Label } from "../../../@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../@/components/ui/select"
import { Loader2, ChevronDown } from "lucide-react"
import styles from "./RegisterPage.module.css"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register, isLoading } = useAuth()
  const [generalError, setGeneralError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null) // Limpiar error previo

    if (!validateForm()) return

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as "admin",
      status: "active" as const,
      permissions: [],
      createdAt: new Date().toISOString(),
    }

    try {
      const success = await register(userData.email, userData.name, userData.password)
      if (success) {
        alert("Registro exitoso")
        navigate("/dashboard")
      } else {
        setGeneralError("El registro ha fallado. Verifica los datos ingresados.")
      }
    } catch (error) {
      setGeneralError("Error del servidor. Intenta nuevamente más tarde.")
    }
  }

  return (
    <DashboardLayout>
      <div className={styles.registerContainer}>
        <div>
          <h1 className={styles.title}>Registrar Nuevo Administrador</h1>
          <p className={styles.description}>Crea una nueva cuenta con acceso administrativo</p>
        </div>

        {generalError && (
          <div className={styles.errorAlert}>
            <p>{generalError}</p>
          </div>
        )}

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>Información del Administrador</CardTitle>
            <CardDescription>
              Completa los siguientes campos para registrar un nuevo administrador o superadministrador.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className={styles.cardContent}>
              <div className={styles.inputContainer}>
                <Label htmlFor="name" className={styles.label}>
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={styles.input}
                />
                {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
              </div>

              <div className={styles.inputContainer}>
                <Label htmlFor="email" className={styles.label}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={styles.input}
                />
                {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
              </div>

              <div className={styles.inputContainer}>
                <Label htmlFor="password" className={styles.label}>
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={styles.input}
                />
                {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
              </div>

              <div className={styles.inputContainer}>
                <Label htmlFor="confirmPassword" className={styles.label}>
                  Confirmar contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={styles.input}
                />
                {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
              </div>

            </CardContent>

            <CardFooter>
              <Button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className={styles.loader} />
                    <span>Registrando...</span>
                  </>
                ) : (
                  "Registrar Administrador"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RegisterPage
