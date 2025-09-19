import type { Route } from "./+types/home";
import { Dashboard } from "~/components/pages/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "采购销售资产管理 - 仪表板" },
    { name: "description", content: "企业采购销售资产管理系统" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
