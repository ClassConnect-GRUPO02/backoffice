"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card"
import { getUsers } from "../services/userService"
import type { User } from "../types/users"
import { Loader2, Users, UserCheck, UserX } from "lucide-react"

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    admins: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getUsers()

        const activeUsers = users.filter((user: User) => user.status === "active")
        const blockedUsers = users.filter((user: User) => user.status === "blocked")
        const admins = users.filter(
          (user: User) => user.role === "admin" || user.role === "superadmin"
        )

        setStats({
          totalUsers: users.length,
          activeUsers: activeUsers.length,
          blockedUsers: blockedUsers.length,
          admins: admins.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm rounded-xl border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Usuarios registrados en la plataforma</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-xl border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <UserCheck className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Usuarios con acceso a la plataforma</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-xl border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Bloqueados</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <UserX className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blockedUsers}</div>
              <p className="text-xs text-muted-foreground">Usuarios sin acceso a la plataforma</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-xl border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admins}</div>
              <p className="text-xs text-muted-foreground">Usuarios con permisos de administración</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-sm rounded-xl border border-border bg-card">
          <CardHeader>
            <CardTitle>Bienvenido al Panel de Administración</CardTitle>
            <CardDescription>
              Gestiona usuarios, permisos y accesos desde este panel centralizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Desde aquí podrás:</p>
            <ul className="ml-6 list-disc [&>li]:mt-2 text-muted-foreground text-sm">
              <li>Ver estadísticas generales del sistema</li>
              <li>Gestionar usuarios y sus permisos</li>
              <li>Registrar nuevos administradores</li>
              <li>Bloquear o desbloquear cuentas de usuario</li>
              <li>Consultar registros de auditoría</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
