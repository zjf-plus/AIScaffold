import { Form, useActionData, useNavigation } from "@remix-run/react";
import { DollarSign, FileText, Tag, Type } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { BudgetCategory, BudgetType, BudgetCategoryLabels, BudgetTypeLabels } from "~/lib/types";

interface ActionData {
  errors?: {
    title?: string;
    amount?: string;
    type?: string;
    category?: string;
  };
}

interface BudgetFormProps {
  initialData?: {
    title?: string;
    description?: string;
    amount?: number;
    category?: BudgetCategory;
    type?: BudgetType;
  };
  mode: "create" | "edit";
}

export function BudgetForm({ initialData, mode }: BudgetFormProps) {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const categoryOptions = Object.entries(BudgetCategoryLabels).map(([value, label]) => ({
    value,
    label,
  }));

  const typeOptions = Object.entries(BudgetTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {mode === "create" ? "新增经费记录" : "编辑经费记录"}
        </CardTitle>
        <CardDescription>
          {mode === "create" ? "请填写经费记录信息" : "修改经费记录信息"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                标题 *
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="请输入经费标题"
                defaultValue={initialData?.title}
                required
              />
              {actionData?.errors?.title && (
                <p className="text-sm text-destructive">{actionData.errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                描述
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="请输入经费描述（可选）"
                defaultValue={initialData?.description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  金额 *
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={initialData?.amount}
                  required
                />
                {actionData?.errors?.amount && (
                  <p className="text-sm text-destructive">{actionData.errors.amount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  类型 *
                </Label>
                <Select name="type" defaultValue={initialData?.type} required>
                  <SelectTrigger>
                    <SelectValue placeholder="选择经费类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {actionData?.errors?.type && (
                  <p className="text-sm text-destructive">{actionData.errors.type}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                分类 *
              </Label>
              <Select name="category" defaultValue={initialData?.category} required>
                <SelectTrigger>
                  <SelectValue placeholder="选择经费分类" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {actionData?.errors?.category && (
                <p className="text-sm text-destructive">{actionData.errors.category}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : mode === "create" ? "创建" : "更新"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
