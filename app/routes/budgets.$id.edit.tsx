import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { BudgetForm } from "~/components/budget/BudgetForm";
import { BudgetService } from "~/lib/services/BudgetService";
import { UpdateBudgetInput, BudgetCategory, BudgetType } from "~/lib/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const budget = await BudgetService.getBudgetById(params.id!);
  
  if (!budget) {
    throw new Response("经费记录不存在", { status: 404 });
  }
  
  return json({ budget });
}

export async function action({ request, params }: ActionFunctionArgs) {
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
    const updateInput: UpdateBudgetInput = {
      id: params.id!,
      title,
      description: description || undefined,
      amount,
      category,
      type,
    };

    await BudgetService.updateBudget(updateInput);
    
    return redirect(`/budgets/${params.id}`);
  } catch (error) {
    console.error("更新经费记录失败:", error);
    return json({ errors: { general: "更新失败，请重试" } }, { status: 500 });
  }
}

export default function EditBudget() {
  const { budget } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const initialData = {
    title: budget.title,
    description: budget.description || "",
    amount: budget.amount,
    category: budget.category,
    type: budget.type,
  };

  return (
    <div className="container mx-auto py-6">
      <BudgetForm mode="edit" initialData={initialData} />
      {actionData?.errors?.general && (
        <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {actionData.errors.general}
        </div>
      )}
    </div>
  );
}
