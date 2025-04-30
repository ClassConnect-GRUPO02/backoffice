import type { User } from "@/types/users"

let mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "admin",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Lucía Gómez",
    email: "lucia@example.com",
    role: "estudiante",
    status: "blocked",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    role: "docente",
    status: "active",
    createdAt: new Date().toISOString(),
  },
]

export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers])
    }, 500) // Simula un delay
  })
}

export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.role = newRole as User["role"]
  }
}

export const toggleUserStatus = async (userId: string, newStatus: "active" | "blocked"): Promise<void> => {
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.status = newStatus
  }
}

export const logAudit = async ({
  action,
  targetUser,
  details,
  timestamp,
}: {
  action: string
  targetUser: string
  details: string
  timestamp: string
}): Promise<void> => {
  console.log("AUDIT LOG:", { action, targetUser, details, timestamp })
}
