import { Link } from "@remix-run/react";
import { Plus, DollarSign } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { BudgetStats } from "~/components/budget/BudgetStats";
import { BudgetTable } from "~/components/budget/BudgetTable";
import { SerializedBudget } from "~/lib/types";

interface DashboardProps {
  budgets: SerializedBudget[];
  stats: {
    totalBudgets: number;
    totalIncome: number;
    totalExpense: number;
    pendingCount: number;
    approvedCount: number;
    netAmount: number;
  };
}

export function Dashboard({ budgets, stats }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">经费管理仪表板</h1>
          <p className="text-muted-foreground">
            管理和跟踪所有经费记录
          </p>
        </div>
        <Button asChild>
          <Link to="/budgets/new">
            <Plus className="mr-2 h-4 w-4" />
            新增经费
          </Link>
        </Button>
      </div>

      <BudgetStats stats={stats} />

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">最近记录</h2>
            <p className="text-muted-foreground">
              查看最新的经费记录
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/budgets">
              查看全部
            </Link>
          </Button>
        </div>
        
        <BudgetTable budgets={budgets.slice(0, 5)} />
      </div>
    </div>
  );
}
