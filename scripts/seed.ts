import { PrismaClient } from "@prisma/client";
import { BudgetCategory, BudgetType, BudgetStatus } from "../app/lib/types";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始创建演示数据...");

  // 创建演示用户
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "演示用户",
      role: "ADMIN",
    },
  });

  console.log("✅ 创建用户:", user.email);

  // 创建演示经费记录
  const budgets = [
    {
      title: "办公用品采购",
      description: "购买办公文具和耗材",
      amount: 500.00,
      category: BudgetCategory.OFFICE_SUPPLIES,
      type: BudgetType.EXPENSE,
      status: BudgetStatus.APPROVED,
      userId: user.id,
    },
    {
      title: "差旅费报销",
      description: "北京出差交通和住宿费用",
      amount: 2000.00,
      category: BudgetCategory.TRAVEL,
      type: BudgetType.EXPENSE,
      status: BudgetStatus.PENDING,
      userId: user.id,
    },
    {
      title: "设备采购",
      description: "购买新电脑设备",
      amount: 8000.00,
      category: BudgetCategory.EQUIPMENT,
      type: BudgetType.EXPENSE,
      status: BudgetStatus.APPROVED,
      userId: user.id,
    },
    {
      title: "项目收入",
      description: "完成项目获得的收入",
      amount: 15000.00,
      category: BudgetCategory.OTHER,
      type: BudgetType.INCOME,
      status: BudgetStatus.COMPLETED,
      userId: user.id,
    },
    {
      title: "培训费用",
      description: "员工技能培训课程费用",
      amount: 3000.00,
      category: BudgetCategory.TRAINING,
      type: BudgetType.EXPENSE,
      status: BudgetStatus.PENDING,
      userId: user.id,
    },
  ];

  for (const budgetData of budgets) {
    const budget = await prisma.budget.create({
      data: budgetData,
    });
    console.log("✅ 创建经费记录:", budget.title);
  }

  console.log("🎉 演示数据创建完成！");
}

main()
  .catch((e) => {
    console.error("❌ 创建演示数据失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
