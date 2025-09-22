import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export default function UsersIndex() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground">
            管理系统用户和权限
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>用户管理</CardTitle>
            <CardDescription>
              用户管理功能正在开发中
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              此功能将在后续版本中提供。
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
