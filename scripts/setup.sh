#!/bin/bash

echo "🚀 开始设置经费管理系统..."

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
node --version

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 生成 Prisma 客户端
echo "🗄️ 生成 Prisma 客户端..."
npm run db:generate

echo "✅ 设置完成！"
echo ""
echo "📝 接下来的步骤："
echo "1. 配置数据库连接（创建 .env 文件）"
echo "2. 运行数据库迁移：npm run db:push"
echo "3. 启动开发服务器：npm run dev"
echo ""
echo "📚 更多信息请查看 README.md 和 PRISMA_SETUP.md"
