import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BudgetList } from "~/components/pages/BudgetList";
import { BudgetService } from "~/lib/services/BudgetService";
import { SerializedBudget } from "~/lib/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const budgets = await BudgetService.getAllBudgets();
  return json({ budgets });
}

export default function BudgetsIndex() {
  const { budgets } = useLoaderData<typeof loader>();

  return <BudgetList budgets={budgets} />;
}
