export interface Budget {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: BudgetCategory;
  status: BudgetStatus;
  type: BudgetType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name?: string;
    email: string;
  };
}

// 序列化后的 Budget 类型（用于 Remix loader）
export interface SerializedBudget {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: BudgetCategory;
  status: BudgetStatus;
  type: BudgetType;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface CreateBudgetInput {
  title: string;
  description?: string;
  amount: number;
  category: BudgetCategory;
  type: BudgetType;
  userId: string;
}

export interface UpdateBudgetInput {
  id: string;
  title?: string;
  description?: string;
  amount?: number;
  category?: BudgetCategory;
  status?: BudgetStatus;
  type?: BudgetType;
}

export enum BudgetCategory {
  OFFICE_SUPPLIES = "OFFICE_SUPPLIES",
  TRAVEL = "TRAVEL",
  EQUIPMENT = "EQUIPMENT",
  MARKETING = "MARKETING",
  TRAINING = "TRAINING",
  MAINTENANCE = "MAINTENANCE",
  OTHER = "OTHER",
}

export enum BudgetStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum BudgetType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export const BudgetCategoryLabels: Record<BudgetCategory, string> = {
  [BudgetCategory.OFFICE_SUPPLIES]: "办公用品",
  [BudgetCategory.TRAVEL]: "差旅费",
  [BudgetCategory.EQUIPMENT]: "设备采购",
  [BudgetCategory.MARKETING]: "市场推广",
  [BudgetCategory.TRAINING]: "培训费用",
  [BudgetCategory.MAINTENANCE]: "维护费用",
  [BudgetCategory.OTHER]: "其他",
};

export const BudgetStatusLabels: Record<BudgetStatus, string> = {
  [BudgetStatus.PENDING]: "待审批",
  [BudgetStatus.APPROVED]: "已批准",
  [BudgetStatus.REJECTED]: "已拒绝",
  [BudgetStatus.COMPLETED]: "已完成",
};

export const BudgetTypeLabels: Record<BudgetType, string> = {
  [BudgetType.INCOME]: "收入",
  [BudgetType.EXPENSE]: "支出",
};
