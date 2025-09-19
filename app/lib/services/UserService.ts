import { db } from '../prisma.server';
import type { User, UserCreateInput, UserUpdateInput } from '../types/User';

export class UserService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllUsers(): Promise<User[]> {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return users.map((user: any) => ({
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!user) return null;
    
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async getUserByName(name: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { username: name }
    });
    
    if (!user) return null;
    
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { email }
    });
    
    if (!user) return null;
    
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const users = await db.user.findMany({
      where: { role },
      orderBy: { createdAt: 'desc' }
    });
    
    return users.map((user: any) => ({
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async createUser(data: UserCreateInput): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await db.user.findUnique({
      where: { username: data.name }
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // 检查邮箱是否已存在
    const existingEmail = await db.user.findUnique({
      where: { email: data.email }
    });
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const user = await db.user.create({
      data: {
        username: data.name,
        email: data.email,
        password: data.password, // 注意：实际应用中需要加密密码
        role: data.role || 'user'
      }
    });
    
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<User | null> {
    const existingUser = await db.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    // 如果更新用户名，检查是否已存在
    if (data.name && data.name !== existingUser.username) {
      const usernameExists = await db.user.findUnique({
        where: { username: data.name }
      });
      if (usernameExists) {
        throw new Error('Username already exists');
      }
    }

    // 如果更新邮箱，检查是否已存在
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await db.user.findUnique({
        where: { email: data.email }
      });
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }

    try {
      const user = await db.user.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.name && { username: data.name }),
          ...(data.email && { email: data.email }),
          ...(data.password && { password: data.password }), // 注意：实际应用中需要加密密码
          ...(data.role && { role: data.role })
        }
      });
      
      return {
        id: user.id.toString(),
        name: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await db.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    try {
      await db.user.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    const users = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: query } },
          { email: { contains: query } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return users.map((user: any) => ({
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!user) {
      throw new Error('User not found');
    }

    // 注意：实际应用中需要验证加密后的密码
    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    try {
      await db.user.update({
        where: { id: parseInt(id) },
        data: { password: newPassword } // 注意：实际应用中需要加密密码
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async resetPassword(id: string, newPassword: string): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!user) {
      throw new Error('User not found');
    }

    try {
      await db.user.update({
        where: { id: parseInt(id) },
        data: { password: newPassword } // 注意：实际应用中需要加密密码
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await db.user.findFirst({
      where: {
        username,
        password // 注意：实际应用中需要验证加密后的密码
      }
    });
    
    if (!user) return null;
    
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async updateUserRole(id: string, role: 'admin' | 'manager' | 'employee'): Promise<User | null> {
    try {
      const user = await db.user.update({
        where: { id: parseInt(id) },
        data: { role }
      });
      
      return {
        id: user.id.toString(),
        name: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      return null;
    }
  }
}