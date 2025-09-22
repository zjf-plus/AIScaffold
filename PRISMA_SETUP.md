# Prisma 数据库设置指南

## 1. 安装 Prisma

Prisma 已经包含在项目依赖中，无需单独安装。

## 2. 配置数据库连接

创建 `.env` 文件并配置数据库连接：

```env
DATABASE_URL="mysql://root:password@localhost:3306/procure_sales_asset_manager"
```

请根据你的 MySQL 配置修改连接字符串。

## 3. 生成 Prisma 客户端

```bash
npm run db:generate
```

## 4. 推送数据库模式

```bash
npm run db:push
```

或者使用迁移：

```bash
npm run db:migrate
```

## 5. 数据库模式

系统包含以下数据模型：

### User (用户)

- `id`: 用户唯一标识
- `email`: 邮箱地址
- `name`: 用户姓名
- `role`: 用户角色 (ADMIN/USER)
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Budget (经费记录)

- `id`: 记录唯一标识
- `title`: 标题
- `description`: 描述
- `amount`: 金额
- `category`: 分类 (办公用品/差旅费/设备采购/市场推广/培训费用/维护费用/其他)
- `status`: 状态 (待审批/已批准/已拒绝/已完成)
- `type`: 类型 (收入/支出)
- `userId`: 关联用户 ID
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 6. 数据库操作

### 查询所有经费记录

```typescript
const budgets = await db.budget.findMany({
  include: {
    user: true,
  },
});
```

### 创建新记录

```typescript
const budget = await db.budget.create({
  data: {
    title: "办公用品采购",
    amount: 500.0,
    category: "OFFICE_SUPPLIES",
    type: "EXPENSE",
    status: "PENDING",
    userId: "user-id",
  },
});
```

### 更新记录

```typescript
const budget = await db.budget.update({
  where: { id: "budget-id" },
  data: { status: "APPROVED" },
});
```

## 7. 数据库管理

### 查看数据库

```bash
npm run db:studio
```

这将打开 Prisma Studio，可以在浏览器中管理数据库。

### 重置数据库

```bash
npx prisma db push --force-reset
```

⚠️ 注意：这将删除所有数据！

## 8. 生产环境部署

在生产环境中，确保：

1. 配置正确的数据库连接字符串
2. 运行数据库迁移：
   ```bash
   npx prisma migrate deploy
   ```
3. 生成 Prisma 客户端：
   ```bash
   npx prisma generate
   ```

## 9. 常见问题

### 连接数据库失败

- 检查 MySQL 服务是否运行
- 验证连接字符串是否正确
- 确认数据库用户权限

### 模式同步问题

- 使用 `npx prisma db push` 强制同步
- 检查 Prisma 模式文件语法

### 类型错误

- 运行 `npm run db:generate` 重新生成客户端
- 重启 TypeScript 服务
