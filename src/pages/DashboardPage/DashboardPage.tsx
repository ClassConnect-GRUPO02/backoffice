"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getUsers, updateUserRole, toggleUserStatus, logAudit } from "../../services/userServiceMock";
import type { User } from "../../types/users";
import { Loader2 } from "lucide-react";
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
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    fetchUsers();
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
        <h1 className="dashboard-title">Gestión de Usuarios</h1>

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
                      fetchUsers();
                    } catch {
                      alert("Error al actualizar rol");
                    }
                  }}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alumno">Alumno</SelectItem>
                    <SelectItem value="docente">Docente</SelectItem>
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
                      fetchUsers();
                    } catch {
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
    </DashboardLayout>
  );
};

export default DashboardPage;
