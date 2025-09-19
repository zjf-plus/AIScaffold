# Prisma 数据库设置指南

## 🎯 Remix 官方推荐的 MySQL 操作方案

根据 Remix 官方最佳实践，推荐使用 **Prisma ORM** 来操作 MySQL 数据库。

## 📋 为什么选择 Prisma？

- ✅ **官方推荐** - Remix 官方教程使用 Prisma 作为示例
- ✅ **TypeScript 原生支持** - 提供完整的类型安全
- ✅ **直观的 Schema 定义** - 易于理解和维护
- ✅ **强大的查询 API** - 简化复杂的数据库操作
- ✅ **迁移管理** - 内置数据库版本控制
- ✅ **开发工具** - Prisma Studio 可视化数据库管理

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

确保 `.env` 文件包含正确的数据库连接字符串：

```env
DATABASE_URL="mysql://username:password@localhost:3306/procure_sales_asset_manager"
```

### 3. 生成 Prisma 客户端

```bash
npm run db:generate
```

### 4. 推送数据库结构

```bash
npm run db:push
```

### 5. 初始化示例数据

```bash
npm run db:init
```

### 6. 启动开发服务器

```bash
npm run dev
```

## 🛠 可用脚本

| 脚本                  | 描述                                   |
| --------------------- | -------------------------------------- |
| `npm run db:generate` | 生成 Prisma 客户端                     |
| `npm run db:push`     | 推送数据库结构（开发环境）             |
| `npm run db:migrate`  | 运行数据库迁移                         |
| `npm run db:init`     | 初始化示例数据                         |
| `npm run db:studio`   | 打开 Prisma Studio（可视化数据库管理） |

## 📁 项目结构

```
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── app/
│   └── lib/
│       └── prisma.server.ts   # Prisma 客户端配置
└── scripts/
    ├── init-db.ts             # 数据库初始化脚本
    └── migrate-db.ts          # 数据库迁移脚本
```

## 🔧 开发工作流

### 修改数据库结构

1. 编辑 `prisma/schema.prisma`
2. 运行 `npm run db:push` 同步到数据库
3. 运行 `npm run db:generate` 更新 TypeScript 类型

### 生产环境部署

1. 使用 `prisma migrate deploy` 而不是 `db push`
2. 确保环境变量正确配置
3. 运行 `npm run db:generate` 生成客户端

## 📊 数据库模型

项目包含以下主要模型：

- **User** - 用户管理
- **Customer** - 客户管理
- **Supplier** - 供应商管理
- **Asset** - 资产管理
- **ProcurementOrder** - 采购订单
- **SalesOrder** - 销售订单
- **MaintenanceRecord** - 维护记录

## 🔍 使用 Prisma Studio

运行 `npm run db:studio` 可以在浏览器中打开 Prisma Studio，提供可视化的数据库管理界面。

## 📚 更多资源

- [Prisma 官方文档](https://www.prisma.io/docs)
- [Remix + Prisma 教程](https://remix.run/docs/en/main/tutorials/blog)
- [Prisma 中文文档](https://prisma.org.cn/)
