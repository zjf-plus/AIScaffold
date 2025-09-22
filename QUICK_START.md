# 快速开始指南

## 🚀 一键启动

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

创建 `.env` 文件：

```env
DATABASE_URL="mysql://root:password@localhost:3306/procure_sales_asset_manager"
```

### 3. 初始化数据库

```bash
# 推送数据库模式
npm run db:push

# 创建演示数据
npm run db:seed
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用！

## 📋 功能演示

系统包含以下功能：

### 🏠 首页仪表板

- 经费统计概览
- 最近记录展示
- 快速操作入口

### 💰 经费管理

- **新增经费**: 创建收入/支出记录
- **编辑记录**: 修改现有记录
- **查看详情**: 完整的记录信息
- **状态管理**: 待审批/已批准/已拒绝/已完成

### 📊 统计报表

- 总收入/支出统计
- 净收入计算
- 待审批记录数量
- 可视化数据展示

### 🎨 界面特性

- **响应式设计**: 支持移动端和 PC 端
- **主题切换**: 深色/浅色模式
- **现代化 UI**: 基于 shadcn/ui 组件库
- **流畅体验**: 快速响应和动画效果

## 🛠️ 开发工具

### 数据库管理

```bash
# 打开 Prisma Studio
npm run db:studio
```

### 代码检查

```bash
# 类型检查
npm run typecheck

# 代码检查
npm run lint
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
app/
├── components/          # 组件库
│   ├── ui/            # 基础UI组件
│   ├── layout/        # 布局组件
│   ├── budget/        # 经费管理组件
│   └── pages/         # 页面组件
├── lib/               # 工具库
│   ├── contexts/     # React上下文
│   ├── services/     # 业务服务
│   ├── types/        # 类型定义
│   └── utils.ts      # 工具函数
├── routes/           # 页面路由
└── root.tsx         # 根组件
```

## 🔧 自定义开发

### 添加新功能

1. 在 `app/lib/types/` 中定义数据类型
2. 在 `app/lib/services/` 中实现业务逻辑
3. 在 `app/components/` 中创建 UI 组件
4. 在 `app/routes/` 中创建页面路由

### 数据库操作

```typescript
import { db } from "~/lib/db/config";

// 查询数据
const budgets = await db.budget.findMany();

// 创建数据
const budget = await db.budget.create({
  data: { title: "新记录", amount: 100 },
});
```

## 🐛 常见问题

### 数据库连接失败

- 检查 MySQL 服务是否运行
- 验证 `.env` 文件中的数据库连接字符串
- 确认数据库用户权限

### 依赖安装失败

- 确保 Node.js 版本 >= 18
- 清除缓存: `npm cache clean --force`
- 删除 `node_modules` 重新安装

### 类型错误

- 运行 `npm run db:generate` 重新生成 Prisma 客户端
- 重启 TypeScript 服务

## 📚 更多信息

- [完整文档](README.md)
- [数据库设置](PRISMA_SETUP.md)
- [系统架构](系统架构.md)

## 🎯 下一步

1. 探索系统功能
2. 查看代码结构
3. 自定义开发
4. 部署到生产环境

祝您使用愉快！ 🎉
