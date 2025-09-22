import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/Layout";
import { BudgetStats } from "~/components/budget/BudgetStats";
import { BudgetService } from "~/lib/services/BudgetService";

export async function loader({ request }: LoaderFunctionArgs) {
  const stats = await BudgetService.getBudgetStats();
  return json({ stats });
}

export default function ReportsIndex() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">统计报表</h1>
          <p className="text-muted-foreground">
            查看经费统计和分析报告
          </p>
        </div>

        <BudgetStats stats={stats} />
      </div>
    </Layout>
  );
}
