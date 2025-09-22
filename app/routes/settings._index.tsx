import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export default function SettingsIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <p className="text-muted-foreground">
          配置系统参数和选项
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>系统设置</CardTitle>
          <CardDescription>
            系统设置功能正在开发中
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            此功能将在后续版本中提供。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
