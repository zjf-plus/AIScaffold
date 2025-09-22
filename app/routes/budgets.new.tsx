import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Layout } from "~/components/layout/Layout";
import { BudgetForm } from "~/components/budget/BudgetForm";
import { BudgetService } from "~/lib/services/BudgetService";
import { CreateBudgetInput, BudgetCategory, BudgetType } from "~/lib/types";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as BudgetCategory;
  const type = formData.get("type") as BudgetType;

  // 验证数据
  const errors: Record<string, string> = {};
  
  if (!title) {
    errors.title = "标题是必填项";
  }
  
  if (!amount || isNaN(amount) || amount <= 0) {
    errors.amount = "请输入有效的金额";
  }
  
  if (!category) {
    errors.category = "请选择分类";
  }
  
  if (!type) {
    errors.type = "请选择类型";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    // 创建经费记录（这里使用一个默认用户ID，实际应用中应该从认证中获取）
    const defaultUserId = "default-user-id";
    
    const budgetInput: CreateBudgetInput = {
      title,
      description: description || undefined,
      amount,
      category,
      type,
      userId: defaultUserId,
    };

    await BudgetService.createBudget(budgetInput);
    
    return redirect("/budgets");
  } catch (error) {
    console.error("创建经费记录失败:", error);
    return json({ errors: { general: "创建失败，请重试" } }, { status: 500 });
  }
}

export default function NewBudget() {
  const actionData = useActionData<typeof action>();

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <BudgetForm mode="create" />
        {actionData?.errors?.general && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {actionData.errors.general}
          </div>
        )}
      </div>
    </Layout>
  );
}
