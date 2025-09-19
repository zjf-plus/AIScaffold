import type { Route } from "./+types/procurement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Search, Filter, Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "采购管理 - 采购销售资产管理" },
    { name: "description", content: "企业采购订单管理系统" },
  ];
}

export default function Procurement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">采购管理</h1>
          <p className="text-muted-foreground">
            管理采购订单、供应商信息和采购流程
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建采购订单
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
          <CardDescription>设置筛选条件来查找特定的采购订单</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索订单号、供应商..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>采购订单</CardTitle>
          <CardDescription>查看和管理所有采购订单</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>暂无采购订单数据</p>
              <p className="text-sm">点击"新建采购订单"开始创建</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
