"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../@/components/ui/card"
import { Loader2 } from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const success = await login(email, password)
    if (success) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9] px-6 py-8">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-8">
        <CardHeader className="text-center space-y-2 mb-6">
          <CardTitle className="text-3xl font-semibold text-[#6200ee]">ClassConnect Admin</CardTitle>
          <CardDescription className="text-gray-500 text-lg">Ingresa tus credenciales para acceder al panel de administración</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-[#F5F5F5] border border-[#D1D1D1] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#6200ee] focus:border-[#6200ee] transition duration-300 ease-in-out"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-[#F5F5F5] border border-[#D1D1D1] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#6200ee] focus:border-[#6200ee] transition duration-300 ease-in-out"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </CardContent>

          {/* Login Button */}
          <CardFooter className="mt-8">
            <Button 
              type="submit" 
              className="w-full bg-[#6200ee] text-white p-4 rounded-lg hover:bg-[#3700b3] focus:outline-none transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
