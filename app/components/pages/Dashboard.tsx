import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  DollarSign,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "总采购额",
      value: "¥2,450,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "总销售额",
      value: "¥3,200,000",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "资产总数",
      value: "1,234",
      change: "+5.1%",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "净利润",
      value: "¥750,000",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
  ];

  const recentActivities = [
    { id: 1, action: "新增采购订单", time: "2小时前", type: "procurement" },
    { id: 2, action: "完成销售交易", time: "4小时前", type: "sales" },
    { id: 3, action: "更新资产信息", time: "6小时前", type: "assets" },
    { id: 4, action: "生成月度报表", time: "1天前", type: "reports" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">仪表板</h1>
          <p className="text-muted-foreground">
            欢迎回来！这里是您的业务概览。
          </p>
        </div>
        <div className="flex space-x-2">
          <Button>导出报表</Button>
          <Button variant="outline">设置</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">较上月</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>
              查看系统中最新的操作记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>
              常用功能快速入口
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              新建采购订单
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              记录销售
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              添加资产
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              管理客户
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              生成报表
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
