"use client"

import type { ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Users, LayoutDashboard, LogOut, Menu } from "lucide-react"
import { Button } from "../../@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../@/components/ui/sheet"
import { Avatar, AvatarFallback } from "../../@/components/ui/avatar"
import { useState } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Gestión de Usuarios", href: "/users", icon: Users },
  ]

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => setOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col overflow-y-auto">
            <div className="px-2 py-6">
              <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
                ClassConnect Admin
              </Link>
            </div>
            <nav className="grid gap-2 px-2">
              <NavLinks />
            </nav>
            <div className="mt-auto px-2">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            ClassConnect Admin
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 border-r md:block">
          <nav className="grid gap-2 p-4">
            <NavLinks />
          </nav>
        </aside>
        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
