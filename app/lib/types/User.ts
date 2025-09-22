export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name?: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  id: string;
  email?: string;
  name?: string;
  role?: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: "管理员",
  [UserRole.USER]: "普通用户",
};
