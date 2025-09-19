# 采购销售资产管理系统

一个现代化的企业级采购、销售和资产管理系统，支持PC端和移动端响应式设计。

## 功能特性

- 🎨 **现代化UI设计** - 基于shadcn/ui组件库
- 📱 **响应式布局** - 完美支持PC端和移动端
- 🚀 **高性能** - 基于React Router v7和Vite
- 🎯 **类型安全** - 完整的TypeScript支持
- 🎨 **主题支持** - 支持明暗主题切换

## 技术栈

- **前端框架**: React 18 + React Router v7
- **构建工具**: Vite
- **样式**: Tailwind CSS v4
- **UI组件**: shadcn/ui
- **图标**: Lucide React
- **语言**: TypeScript

## 项目结构

```
app/
├── components/
│   ├── layout/          # 布局组件
│   │   ├── Header.tsx   # 顶部导航
│   │   ├── Sidebar.tsx  # 侧边栏
│   │   └── Layout.tsx   # 主布局
│   ├── pages/           # 页面组件
│   │   └── Dashboard.tsx # 仪表板
│   └── ui/              # shadcn/ui组件
├── routes/              # 路由页面
│   ├── home.tsx         # 首页
│   ├── procurement.tsx  # 采购管理
│   ├── sales.tsx        # 销售管理
│   └── assets.tsx       # 资产管理
├── lib/                 # 工具函数
└── app.css              # 全局样式
```

## 响应式设计

### PC端 (≥768px)

- 固定侧边栏导航
- 顶部导航栏
- 多列网格布局
- 悬停交互效果

### 移动端 (<768px)

- 汉堡菜单导航
- 全屏侧边栏
- 单列布局
- 触摸友好的交互

## 快速开始

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm run dev
   ```

3. **访问应用**
   - 打开浏览器访问 `http://localhost:5173`
   - 使用开发者工具测试移动端效果

## 页面功能

### 仪表板 (首页)

- 业务数据概览
- 快速操作入口
- 最近活动记录
- 统计图表展示

### 采购管理

- 采购订单管理
- 供应商信息
- 采购流程跟踪
- 数据筛选和搜索

### 销售管理

- 销售订单管理
- 客户信息管理
- 销售数据分析
- 业绩统计报表

### 资产管理

- 资产清单管理
- 资产状态跟踪
- 维护记录
- 资产价值统计

## 开发指南

### 添加新页面

1. 在 `app/routes/` 目录下创建新的路由文件
2. 在 `app/components/pages/` 目录下创建页面组件
3. 更新侧边栏导航菜单

### 自定义样式

- 使用 Tailwind CSS 类名
- 支持响应式断点: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- 遵循设计系统规范

### 添加新组件

```bash
npx shadcn@latest add [component-name]
```

## 部署

```bash
npm run build
npm run start
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
