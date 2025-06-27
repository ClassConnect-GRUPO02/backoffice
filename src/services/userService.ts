import { api } from "./api";
import { User } from "../types/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  console.log(response.data);

  if (!Array.isArray(response.data.users)) {
    throw new Error("La respuesta del servidor no es un array de usuarios");
  }

  const sortedUsers = response.data.users.sort((a: User, b: User) =>
    new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime()
  );

  return sortedUsers;
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
