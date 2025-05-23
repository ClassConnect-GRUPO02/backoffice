export interface User {
    id: string
    name: string
    email: string
    userType: "admin" | "Alumno" | "Docente"
    blocked: boolean
    registrationDate: string
  }
  
  export interface Permission {
    id: string
    name: string
    description: string
  }
  
  export interface UserFilters {
    search?: string
    role?: string
    status?: string
  }
  
  export interface AuditLog {
    id: string
    userId: string
    adminId: string
    action: string
    details: string
    timestamp: string
  }
  