"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getUsers } from "../services/userService";
import type { User, UserFilters } from "../types/users";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { Badge } from "../../@/components/ui/badge";
import {
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  UserCog,
  UserX,
  UserCheck,
} from "lucide-react";

const UsersManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // Reemplazá la llamada a getUsers con este array
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "estudiante",
      status: "active",
      createdAt: new Date().toISOString(),
      permissions: [],
    },
    {
      id: "2",
      name: "Laura Martínez",
      email: "laura@example.com",
      role: "estudiante",
      status: "blocked",
      createdAt: new Date().toISOString(),
      permissions: [],
    },
    {
      id: "3",
      name: "Pedro Gómez",
      email: "pedro@example.com",
      role: "docente",
      status: "active",
      createdAt: new Date().toISOString(),
      permissions: [],
    },
  ];

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      // Simula un pequeño delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filtrado básico para simular filtros reales
      let filtered = mockUsers;

      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
      }

      if (filters.role && filters.role !== "all") {
        filtered = filtered.filter((user) => user.role === filters.role);
      }

      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter((user) => user.status === filters.status);
      }

      setUsers(filtered);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error: No se pudieron cargar los usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  /*const fetchUsers = async () => {
    try {
      setIsLoading(true)
      //const data = await getUsers(filters)
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      alert("Error: No se pudieron cargar los usuarios")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (userId: string, currentStatus: "active" | "blocked") => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active"
      await toggleUserStatus(userId, newStatus)

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
      alert("Estado actualizado")
      
    } catch (error) {
      console.error("Error toggling user status:", error)
      alert("Error: No se pudo actualizar el estado del usuario")
    }
  } */

    const handleToggleStatus = (userId: string, currentStatus: "active" | "blocked") => {
      const newStatus = currentStatus === "active" ? "blocked" : "active";
    
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    
      alert(`Usuario ${newStatus === "active" ? "activado" : "bloqueado"} correctamente`);
    };
    

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleRoleFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, role: value }));
  };

  const handleStatusFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", role: "", status: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-primary">
            Gestión de Usuarios
          </h1>
          <Link to="/register">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Administrador
            </Button>
          </Link>
        </div>

        <Card className="shadow-sm rounded-xl border border-gray-200">
          <CardHeader className="px-0">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Busca y filtra usuarios por diferentes criterios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email"
                  className="pl-8"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <Select
                value={filters.role}
                onValueChange={handleRoleFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="estudiante">Estudiante</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl border border-gray-200">
          <CardHeader className="px-0">
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>
              Lista de usuarios registrados en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-md border border-gray-300">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No se encontraron usuarios
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge>
                              {user.role === "estudiante"
                                ? "Estudiante"
                                : user.role === "docente"
                                ? "Docente"
                                : user.role}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {user.status === "active"
                                ? "Activo"
                                : "Bloqueado"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Abrir menú</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Link to={`/users/${user.id}`}>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Editar permisos
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleToggleStatus(user.id, user.status)
                                  }
                                >
                                  {user.status === "active" ? (
                                    <>
                                      <UserX className="mr-2 h-4 w-4" />
                                      Bloquear usuario
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="mr-2 h-4 w-4" />
                                      Activar usuario
                                    </>
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersManagementPage;
