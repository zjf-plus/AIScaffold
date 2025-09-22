import { Link } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { BudgetTable } from "~/components/budget/BudgetTable";
import { SerializedBudget } from "~/lib/types";

interface BudgetListProps {
  budgets: SerializedBudget[];
}

export function BudgetList({ budgets }: BudgetListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">经费管理</h1>
          <p className="text-muted-foreground">
            管理所有经费记录，包括收入和支出
          </p>
        </div>
        <Button asChild>
          <Link to="/budgets/new">
            <Plus className="mr-2 h-4 w-4" />
            新增经费
          </Link>
        </Button>
      </div>

      <BudgetTable budgets={budgets} />
    </div>
  );
}
