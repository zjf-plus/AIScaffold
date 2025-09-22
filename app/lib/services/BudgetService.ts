import { db } from "~/lib/db/config";
import { Budget, CreateBudgetInput, UpdateBudgetInput, BudgetStatus } from "~/lib/types";

export class BudgetService {
  // 创建经费记录
  static async createBudget(input: CreateBudgetInput): Promise<Budget> {
    const budget = await db.budget.create({
      data: {
        title: input.title,
        description: input.description,
        amount: input.amount,
        category: input.category,
        type: input.type,
        userId: input.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      ...budget,
      amount: Number(budget.amount),
    } as Budget;
  }

  // 获取所有经费记录
  static async getAllBudgets(): Promise<Budget[]> {
    const budgets = await db.budget.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return budgets.map(budget => ({
      ...budget,
      amount: Number(budget.amount),
    })) as Budget[];
  }

  // 根据状态获取经费记录
  static async getBudgetsByStatus(status: BudgetStatus): Promise<Budget[]> {
    const budgets = await db.budget.findMany({
      where: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return budgets.map(budget => ({
      ...budget,
      amount: Number(budget.amount),
    })) as Budget[];
  }

  // 根据ID获取经费记录
  static async getBudgetById(id: string): Promise<Budget | null> {
    const budget = await db.budget.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!budget) return null;

    return {
      ...budget,
      amount: Number(budget.amount),
    } as Budget;
  }

  // 更新经费记录
  static async updateBudget(input: UpdateBudgetInput): Promise<Budget> {
    const { id, ...updateData } = input;
    
    const budget = await db.budget.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      ...budget,
      amount: Number(budget.amount),
    } as Budget;
  }

  // 删除经费记录
  static async deleteBudget(id: string): Promise<void> {
    await db.budget.delete({
      where: { id },
    });
  }

  // 获取统计信息
  static async getBudgetStats() {
    const [
      totalBudgets,
      totalIncome,
      totalExpense,
      pendingCount,
      approvedCount,
    ] = await Promise.all([
      db.budget.count(),
      db.budget.aggregate({
        where: { type: "INCOME" },
        _sum: { amount: true },
      }),
      db.budget.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      }),
      db.budget.count({
        where: { status: "PENDING" },
      }),
      db.budget.count({
        where: { status: "APPROVED" },
      }),
    ]);

    return {
      totalBudgets,
      totalIncome: Number(totalIncome._sum.amount || 0),
      totalExpense: Number(totalExpense._sum.amount || 0),
      pendingCount,
      approvedCount,
      netAmount: Number(totalIncome._sum.amount || 0) - Number(totalExpense._sum.amount || 0),
    };
  }
}