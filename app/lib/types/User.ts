// 用户模型
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'manager' | 'employee';
  avatar?: string;
}
