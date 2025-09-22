import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Layout } from "~/components/layout/Layout";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { BudgetService } from "~/lib/services/BudgetService";
import { BudgetCategoryLabels, BudgetStatusLabels, BudgetTypeLabels } from "~/lib/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const budget = await BudgetService.getBudgetById(params.id!);
  
  if (!budget) {
    throw new Response("经费记录不存在", { status: 404 });
  }
  
  return json({ budget });
}

export default function BudgetDetail() {
  const { budget } = useLoaderData<typeof loader>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "INCOME" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/budgets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{budget.title}</h1>
              <p className="text-muted-foreground">
                经费记录详情
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to={`/budgets/${budget.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                编辑
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              删除
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>
                经费记录的基本信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">标题</label>
                <p className="text-lg font-semibold">{budget.title}</p>
              </div>
              
              {budget.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">描述</label>
                  <p className="text-sm">{budget.description}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">金额</label>
                <p className={`text-2xl font-bold ${budget.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                  {budget.type === "INCOME" ? "+" : "-"}¥{budget.amount.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>分类信息</CardTitle>
              <CardDescription>
                经费的分类和状态信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">类型</label>
                <div className="mt-1">
                  <Badge className={getTypeColor(budget.type)}>
                    {BudgetTypeLabels[budget.type]}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">分类</label>
                <p className="text-sm">{BudgetCategoryLabels[budget.category]}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">状态</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(budget.status)}>
                    {BudgetStatusLabels[budget.status]}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>时间信息</CardTitle>
            <CardDescription>
              记录的创建和更新时间
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">创建时间</label>
                <p className="text-sm">{new Date(budget.createdAt).toLocaleString("zh-CN")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">更新时间</label>
                <p className="text-sm">{new Date(budget.updatedAt).toLocaleString("zh-CN")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
