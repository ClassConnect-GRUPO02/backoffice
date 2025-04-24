"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import { getUserById, updateUser, getAuditLogs } from "../services/userService"
import type { User, Permission, AuditLog } from "../types/users"
import { Button } from "../../@/components/ui/button"
import { Checkbox } from "../../@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs"
import { Badge } from "../../@/components/ui/badge"
import { Loader2, ArrowLeft } from "lucide-react"

const availablePermissions: Permission[] = [
  { id: "1", name: "users.view", description: "Ver usuarios" },
  { id: "2", name: "users.create", description: "Crear usuarios" },
  { id: "3", name: "users.edit", description: "Editar usuarios" },
  { id: "4", name: "users.delete", description: "Eliminar usuarios" },
  { id: "5", name: "courses.view", description: "Ver cursos" },
  { id: "6", name: "courses.create", description: "Crear cursos" },
  { id: "7", name: "courses.edit", description: "Editar cursos" },
  { id: "8", name: "courses.delete", description: "Eliminar cursos" },
]

const UserEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await getUserById(id)
        setUser(userData)
        setSelectedRole(userData.role)
        setSelectedPermissions(userData.permissions.map((p: Permission) => p.id))

        const logs = await getAuditLogs(id)
        setAuditLogs(logs)
      } catch (error) {
        console.error("Error fetching user data:", error)
        alert("Error: No se pudo cargar la información del usuario")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, permissionId] : prev.filter((id) => id !== permissionId)
    )
  }

  const handleSave = async () => {
    if (!user || !id) return

    try {
      setIsSaving(true)
      const updatedPermissions = availablePermissions.filter((p) =>
        selectedPermissions.includes(p.id)
      )

      await updateUser(id, {
        role: selectedRole as "admin",
        permissions: updatedPermissions,
      })

      alert("Cambios guardados correctamente")

      setUser({
        ...user,
        role: selectedRole as "admin",
        permissions: updatedPermissions,
      })
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Error al guardar cambios")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Usuario no encontrado</h2>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/users")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la lista de usuarios
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/users")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Editar Usuario</h1>
        </div>

        <div className="grid gap-6">
          <Card className="rounded-xl border p-6 shadow-sm">
            <CardHeader className="px-0">
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>Detalles básicos del usuario</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="text-base font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-base font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge
                  variant="outline"
                  className={`capitalize ${
                    user.status === "active"
                      ? "border-green-500 text-green-600"
                      : "border-red-500 text-red-600"
                  }`}
                >
                  {user.status === "active" ? "Activo" : "Bloqueado"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de registro</p>
                <p className="text-base font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="permissions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="permissions">Permisos</TabsTrigger>
              <TabsTrigger value="audit">Registro de Auditoría</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions">
              <Card className="rounded-xl border p-6 shadow-sm">
                <CardHeader className="px-0">
                  <CardTitle>Rol y Permisos</CardTitle>
                  <CardDescription>Define acceso y acciones para este usuario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Rol</h3>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Permisos</h3>
                    <div className="grid gap-4 md:grid-cols-2 max-h-64 overflow-y-auto pr-2">
                      {availablePermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`permission-${permission.id}`}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.id, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`permission-${permission.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission.description}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar cambios"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="audit">
              <Card className="rounded-xl border p-6 shadow-sm">
                <CardHeader className="px-0">
                  <CardTitle>Registro de Auditoría</CardTitle>
                  <CardDescription>Historial de cambios en este usuario</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {auditLogs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      No hay registros de auditoría para este usuario
                    </p>
                  ) : (
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Acción</TableHead>
                            <TableHead>Administrador</TableHead>
                            <TableHead>Detalles</TableHead>
                            <TableHead>Fecha</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log) => (
                            <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell>{log.action}</TableCell>
                              <TableCell>{log.adminId}</TableCell>
                              <TableCell className="max-w-xs break-words text-sm text-muted-foreground">
                                {log.details}
                              </TableCell>
                              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserEditPage
