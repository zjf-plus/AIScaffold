import { db } from "~/lib/db/config";
import { User, CreateUserInput, UpdateUserInput } from "~/lib/types";

export class UserService {
  // 创建用户
  static async createUser(input: CreateUserInput): Promise<User> {
    const user = await db.user.create({
      data: {
        email: input.email,
        name: input.name,
        role: input.role || "USER",
      },
    });

    return user as User;
  }

  // 获取所有用户
  static async getAllUsers(): Promise<User[]> {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users as User[];
  }

  // 根据ID获取用户
  static async getUserById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user as User | null;
  }

  // 根据邮箱获取用户
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user as User | null;
  }

  // 更新用户
  static async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...updateData } = input;
    
    const user = await db.user.update({
      where: {
        id,
      },
      data: updateData,
    });

    return user as User;
  }

  // 删除用户
  static async deleteUser(id: string): Promise<void> {
    await db.user.delete({
      where: {
        id,
      },
    });
  }
}
