import { api } from "./api";
import { User } from "../types/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  if (!Array.isArray(response.data)) {
    throw new Error("La respuesta del servidor no es un array de usuarios");
  }
  return response.data;
};

export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  await api.put(`/user/${userId}/type/${newRole}`);
};

export const blockUser = async (userId: string): Promise<void> => {
  await api.put(`/user/${userId}/block`);
};

export const unblockUser = async (userId: string): Promise<void> => {
  await api.put(`/user/${userId}/unblock`);
};
