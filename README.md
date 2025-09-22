# 经费管理系统

基于 Remix 3 + shadcn/ui + Prisma + MySQL + Vite 构建的现代化经费管理系统。

## 技术栈

- **前端框架**: Remix 3
- **UI 组件库**: shadcn/ui
- **数据库 ORM**: Prisma
- **数据库**: MySQL
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **类型检查**: TypeScript

## 功能特性

- 🎨 现代化 UI 设计，支持深色/浅色主题切换
- 📱 响应式布局，支持移动端和 PC 端
- 💰 经费记录管理（收入/支出）
- 📊 统计报表和数据分析
- 🔍 高级搜索和筛选
- 👥 用户权限管理
- ⚡ 快速响应和流畅体验

## 快速开始

### 环境要求

- Node.js 18+
- MySQL 8.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 数据库配置

1. 创建 MySQL 数据库
2. 配置环境变量（复制 `.env.example` 为 `.env`）
3. 运行数据库迁移

```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 或者运行迁移
npm run db:migrate
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

## 项目结构

```
app/
├── components/          # 可复用组件
│   ├── ui/            # shadcn/ui 基础组件
│   ├── layout/        # 布局组件
│   ├── budget/        # 经费管理组件
│   └── pages/         # 页面组件
├── lib/               # 工具库
│   ├── contexts/     # React 上下文
│   ├── services/     # 业务服务层
│   ├── types/        # TypeScript 类型定义
│   └── utils.ts      # 工具函数
├── routes/           # Remix 路由
└── root.tsx         # 根组件

prisma/
└── schema.prisma    # 数据库模式定义
```

## 主要功能

### 经费管理

- 创建、编辑、删除经费记录
- 支持收入和支出类型
- 多种分类标签
- 状态管理（待审批、已批准、已拒绝、已完成）

### 统计报表

- 总收入/支出统计
- 净收入计算
- 待审批记录数量
- 可视化图表展示

### 用户界面

- 响应式侧边栏导航
- 主题切换支持
- 移动端友好设计
- 现代化 UI 组件

## 开发指南

### 添加新功能

1. 在 `app/lib/types/` 中定义类型
2. 在 `app/lib/services/` 中实现业务逻辑
3. 在 `app/components/` 中创建 UI 组件
4. 在 `app/routes/` 中创建路由页面

### 数据库操作

使用 Prisma 进行数据库操作：

```typescript
import { db } from "~/lib/db/config";

// 查询数据
const budgets = await db.budget.findMany();

// 创建数据
const budget = await db.budget.create({
  data: { title: "新记录", amount: 100 },
});
```

## 部署

### 生产环境构建

```bash
npm run build
```

### 环境变量配置

确保在生产环境中配置正确的环境变量：

```env
DATABASE_URL="mysql://user:password@localhost:3306/database"
NODE_ENV=production
```

## 许可证

MIT License
