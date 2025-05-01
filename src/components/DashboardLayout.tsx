"use client";

import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Users, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Avatar, AvatarFallback } from "../../@/components/ui/avatar";
import { useState } from "react";
import "./Layout.css"; // Asegúrate de importar el archivo CSS

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout-wrapper">
      {/* Header */}
      <header className="header">
  <div className="header-content">
    <span className="header-logo">ClassConnect Admin</span>

    <div className="header-actions">
      <Button
        variant="default"
        className="register-admin-button"
        onClick={() => navigate("/register")}
      >
        Registrar administrador
      </Button>

      <div className="avatar-container">
        <Avatar className="avatar">
          <AvatarFallback className="avatar-fallback">
            {user?.name?.charAt(0) || "A"}
          </AvatarFallback>
        </Avatar>

        <div className="user-info">
          <p className="user-name">{user?.name}</p>
          <p className="user-email">{user?.email}</p>
        </div>

        <Button
          variant="outline"
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Cerrar sesión</span>
        </Button>
      </div>
    </div>
  </div>
</header>


      {/* Main content */}
      <div className="main-content-container">
        {/* Page content */}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
