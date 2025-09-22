import { DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface BudgetStatsProps {
  stats: {
    totalBudgets: number;
    totalIncome: number;
    totalExpense: number;
    pendingCount: number;
    approvedCount: number;
    netAmount: number;
  };
}

export function BudgetStats({ stats }: BudgetStatsProps) {
  const statCards = [
    {
      title: "总收入",
      value: `¥${stats.totalIncome.toFixed(2)}`,
      description: "所有收入记录",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "总支出",
      value: `¥${stats.totalExpense.toFixed(2)}`,
      description: "所有支出记录",
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "净收入",
      value: `¥${stats.netAmount.toFixed(2)}`,
      description: "收入减去支出",
      icon: DollarSign,
      color: stats.netAmount >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "待审批",
      value: stats.pendingCount.toString(),
      description: "等待审批的记录",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "已批准",
      value: stats.approvedCount.toString(),
      description: "已批准的记录",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      title: "总记录",
      value: stats.totalBudgets.toString(),
      description: "所有经费记录",
      icon: DollarSign,
      color: "text-gray-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
