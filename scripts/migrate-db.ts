#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { config } from 'dotenv';

// 加载环境变量
config();

async function main() {
  console.log('🚀 开始数据库迁移...');
  
  try {
    // 生成 Prisma 客户端
    console.log('📦 生成 Prisma 客户端...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // 推送数据库结构（开发环境）
    console.log('🔄 推送数据库结构...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    console.log('✅ 数据库迁移完成！');
    
  } catch (error) {
    console.error('❌ 迁移过程中发生错误:', error);
    process.exit(1);
  }
}

main();
