import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Dashboard } from "~/components/pages/Dashboard";
import { BudgetService } from "~/lib/services/BudgetService";
import { SerializedBudget } from "~/lib/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const [budgets, stats] = await Promise.all([
    BudgetService.getAllBudgets(),
    BudgetService.getBudgetStats(),
  ]);

  return json({ budgets, stats });
}

export default function Index() {
  const { budgets, stats } = useLoaderData<typeof loader>();

  return <Dashboard budgets={budgets} stats={stats} />;
}
