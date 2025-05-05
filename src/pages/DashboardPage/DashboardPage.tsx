"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  getUsers,
  updateUserRole,
  blockUser,
  unblockUser,
} from "../../services/userService";
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
import styles from "./DashboardPage.module.css"; // Cambiado a CSS Modules
import { toast } from "react-toastify"; // Importamos toastify

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
    const id = localStorage.getItem("id");
    if (!token) navigate("/login");
    fetchUsers();
  }, [navigate]);

  const handleRoleChange = async (user: User, newRole: string) => {
    if (user.userType === newRole) {
      toast.info("El rol ya es el mismo, no se realizó ningún cambio.");
      return; // Evitamos cambiar el rol si ya es el mismo
    }

    const confirmChange = window.confirm(
      `¿Estás seguro de cambiar el rol de ${user.name} a ${newRole}?`
    );
    if (!confirmChange) return;

    try {
      await updateUserRole(user.id, newRole);
      fetchUsers(); // Refrescar usuarios
      toast.success(`Rol de ${user.name} cambiado a ${newRole} con éxito.`);
    } catch {
      toast.error("Error al actualizar rol.");
    }
  };

  const handleBlockUnblock = async (user: User) => {
    const action = user.blocked ? "desbloquear" : "bloquear";
    const confirmChange = window.confirm(
      `¿Estás seguro de que quieres ${action} a ${user.name}?`
    );

    if (!confirmChange) return;

    try {
      if (user.blocked) {
        await unblockUser(user.id);
        toast.success(`Usuario ${user.name} desbloqueado.`);
      } else {
        await blockUser(user.id);
        toast.success(`Usuario ${user.name} bloqueado.`);
      }
      fetchUsers(); // Refrescar usuarios
    } catch {
      toast.error("Error al cambiar estado.");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className={styles.loaderContainer}>
          <Loader2 className={styles.loaderIcon} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.dashboardPage}>
        <h1 className={styles.dashboardTitle}>Gestión de Usuarios</h1>

        <div className={styles.userTable}>
          <div className={styles.userTableHeader}>
            <span>Nombre</span>
            <span>Rol</span>
            <span>Estado</span>
            <span>Registro</span>
            <span>Acciones</span>
          </div>

          {users.map((user) => (
            <div key={user.id} className={styles.userTableRow}>
              <span data-label="Nombre">{user.name}</span>

              <span data-label="Rol">
                <Select
                  value={user.userType}
                  onValueChange={(newRole) => handleRoleChange(user, newRole)}
                >
                  <SelectTrigger className={styles.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    className={styles.selectContent}
                    avoidCollisions={false}
                    position="popper"
                  >
                    <SelectItem value="alumno" className={styles.selectItem}>
                      Alumno
                    </SelectItem>
                    <SelectItem value="docente" className={styles.selectItem}>
                      Docente
                    </SelectItem>
                  </SelectContent>
                </Select>
              </span>

              <span data-label="Estado" className={styles.userStatus}>
                <div
                  className={`${styles.statusIndicator} ${
                    user.blocked ? styles.statusBlocked : styles.statusActive
                  }`}
                ></div>
                {user.blocked ? "Bloqueado" : "Activo"}
              </span>

              <span data-label="Registro">
                {new Date(user.registrationDate).toLocaleDateString()}
              </span>

              <span data-label="Acciones">
                <Button
                  variant="outline"
                  className={`${styles.actionButton} ${
                    user.blocked ? styles.unblockButton : styles.blockButton
                  }`}
                  onClick={() => handleBlockUnblock(user)}
                >
                  {user.blocked ? "Desbloquear" : "Bloquear"}
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
