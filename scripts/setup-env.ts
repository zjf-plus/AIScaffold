#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

/**
 * 环境配置设置脚本
 * 用于根据环境类型复制相应的配置文件
 */

const environments = ['development', 'production', 'test'] as const;
type Environment = typeof environments[number];

function setupEnvironment(env: Environment): void {
  const envFile = path.join(process.cwd(), 'app', 'lib', 'config', 'environments', `${env}.env`);
  const targetFile = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envFile)) {
    console.error(`❌ 环境配置文件不存在: ${envFile}`);
    process.exit(1);
  }
  
  try {
    // 复制环境配置文件
    fs.copyFileSync(envFile, targetFile);
    console.log(`✅ 已设置 ${env} 环境配置`);
    console.log(`📁 配置文件: ${targetFile}`);
    
    // 显示配置信息
    const config = fs.readFileSync(targetFile, 'utf-8');
    const lines = config.split('\n').filter(line => 
      line.trim() && !line.startsWith('#')
    );
    
    console.log('\n📋 当前配置:');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        const displayValue = key.includes('PASSWORD') || key.includes('SECRET') 
          ? '***' 
          : value;
        console.log(`   ${key}=${displayValue}`);
      }
    });
    
  } catch (error) {
    console.error(`❌ 设置环境配置失败:`, error);
    process.exit(1);
  }
}

function showHelp(): void {
  console.log(`
🔧 环境配置设置工具

用法:
  npm run setup-env <environment>

支持的环境:
  development  - 开发环境
  production   - 生产环境  
  test         - 测试环境

示例:
  npm run setup-env development
  npm run setup-env production
  npm run setup-env test

注意:
  - 此脚本会复制对应的环境配置文件到 .env
  - 请根据实际环境修改 .env 文件中的配置值
  - 生产环境请使用强密码和安全的密钥
`);
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  const env = args[0] as Environment;
  
  if (!environments.includes(env)) {
    console.error(`❌ 不支持的环境: ${env}`);
    console.error(`支持的环境: ${environments.join(', ')}`);
    process.exit(1);
  }
  
  setupEnvironment(env);
}

// 在ES模块中直接调用main函数
main();
