export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'admin' | 'manager' | 'employee';
  department?: string;
  phone?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role?: 'admin' | 'manager' | 'employee';
  department?: string;
  phone?: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  full_name?: string;
  role?: 'admin' | 'manager' | 'employee';
  department?: string;
  phone?: string;
  is_active?: boolean;
}
