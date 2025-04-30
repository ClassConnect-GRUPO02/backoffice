"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getUsers, updateUserRole, toggleUserStatus, logAudit } from "../../services/userService";
import type { User } from "../../types/users";
import { Loader2, Users, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Button } from "../../../@/components/ui/button";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    admins: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const users = await getUsers();

      const activeUsers = users.filter((user: User) => user.status === "active");
      const blockedUsers = users.filter((user: User) => user.status === "blocked");
      const admins = users.filter((user: User) => user.role === "admin");

      setUsers(users);
      setStats({
        totalUsers: users.length,
        activeUsers: activeUsers.length,
        blockedUsers: blockedUsers.length,
        admins: admins.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    fetchStats();
  }, [navigate]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="loader-container">
          <Loader2 className="loader-icon" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="stats-grid">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Total Usuarios</span>
              <div className="card-icon"><Users size={16} /></div>
            </div>
            <div className="card-content">{stats.totalUsers}</div>
            <p className="card-subtext">Usuarios registrados en la plataforma</p>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Usuarios Activos</span>
              <div className="card-icon"><UserCheck size={16} /></div>
            </div>
            <div className="card-content">{stats.activeUsers}</div>
            <p className="card-subtext">Usuarios con acceso a la plataforma</p>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Usuarios Bloqueados</span>
              <div className="card-icon"><UserX size={16} /></div>
            </div>
            <div className="card-content">{stats.blockedUsers}</div>
            <p className="card-subtext">Usuarios sin acceso a la plataforma</p>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Administradores</span>
              <div className="card-icon"><Users size={16} /></div>
            </div>
            <div className="card-content">{stats.admins}</div>
            <p className="card-subtext">Usuarios con permisos de administración</p>
          </div>
        </div>

        <div className="card admin-info-card">
          <div className="card-header">
            <span className="card-title">Bienvenido al Panel de Administración</span>
          </div>
          <p className="card-subtext">Gestiona usuarios, permisos y accesos desde este panel centralizado</p>
          <ul className="admin-info-list">
            <li>Ver estadísticas generales del sistema</li>
            <li>Gestionar usuarios y sus permisos</li>
            <li>Registrar nuevos administradores</li>
            <li>Bloquear o desbloquear cuentas de usuario</li>
            <li>Consultar registros de auditoría</li>
          </ul>
        </div>

        {/* GESTIÓN DE USUARIOS */}
        <div className="user-management-section">
          <h2 className="dashboard-subtitle">Gestión de Usuarios</h2>

          <div className="user-table">
            <div className="user-table-header">
              <span>Nombre</span>
              <span>Rol</span>
              <span>Estado</span>
              <span>Registro</span>
              <span>Acciones</span>
            </div>

            {users.map((user) => (
              <div key={user.id} className="user-table-row">
                <span>{user.name}</span>

                <span>
                  <Select
                    value={user.role}
                    onValueChange={async (newRole) => {
                      try {
                        await updateUserRole(user.id, newRole);
                        await logAudit({
                          action: "Cambio de rol",
                          targetUser: user.id,
                          details: `De ${user.role} a ${newRole}`,
                          timestamp: new Date().toISOString(),
                        });
                        fetchStats();
                      } catch (err) {
                        alert("Error al actualizar rol");
                      }
                    }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alumno">Alumno</SelectItem>
                      <SelectItem value="docente">Docente</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Superadmin</SelectItem>
                    </SelectContent>
                  </Select>
                </span>

                <span>{user.status}</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>

                <span>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        const newStatus = user.status === "active" ? "blocked" : "active";
                        await toggleUserStatus(user.id, newStatus);
                        await logAudit({
                          action: newStatus === "active" ? "Desbloqueo" : "Bloqueo",
                          targetUser: user.id,
                          details: `Cambio a estado ${newStatus}`,
                          timestamp: new Date().toISOString(),
                        });
                        fetchStats();
                      } catch (err) {
                        alert("Error al cambiar estado");
                      }
                    }}
                  >
                    {user.status === "active" ? "Bloquear" : "Desbloquear"}
                  </Button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
