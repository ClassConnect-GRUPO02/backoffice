import axios from "axios";
import type { User } from "../types/users";

const API_BASE_URL = "https://tu-backend.com/api"; // ← cambia por tu URL real

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.put(
    `${API_BASE_URL}/users/${userId}/role`,
    { role: newRole },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const toggleUserStatus = async (userId: string, newStatus: "active" | "blocked"): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.put(
    `${API_BASE_URL}/users/${userId}/status`,
    { status: newStatus },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUserById = async (id: string): Promise<User> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("No token found")
  }

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Error al obtener el usuario")
  }

  const data = await response.json()
  return data as User
}

export const logAudit = async ({
  action,
  targetUser,
  details,
  timestamp,
}: {
  action: string;
  targetUser: string;
  details: string;
  timestamp: string;
}): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${API_BASE_URL}/audit`,
    {
      action,
      targetUser,
      details,
      timestamp,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
