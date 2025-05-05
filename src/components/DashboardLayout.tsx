"use client"

import type { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { LogOut } from "lucide-react"
import { Button } from "../../@/components/ui/button"
import { Avatar, AvatarFallback } from "../../@/components/ui/avatar"
import styles from "./Layout.module.css" // Cambiado a CSS Modules

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className={styles.layoutWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.headerLogo}>ClassConnect Admin</span>

          <div className={styles.headerActions}>
            <Button variant="default" className={styles.registerAdminButton} onClick={() => navigate("/register")}>
              Registrar administrador
            </Button>

            <div className={styles.avatarContainer}>
              <Avatar className={styles.avatar}>
                <AvatarFallback className={styles.avatarFallback}>{localStorage.getItem("email")?.toUpperCase().charAt(0) || "A"}</AvatarFallback>
              </Avatar>

              <Button variant="outline" className={styles.logoutButton} onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className={styles.mainContentContainer}>
        {/* Page content */}
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
