/**
 * 环境配置管理
 * 支持开发、测试、生产环境的不同配置
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export type Environment = 'development' | 'test' | 'production';

export interface DatabaseConfig {
  url: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface AppConfig {
  nodeEnv: Environment;
  database: DatabaseConfig;
  sessionSecret: string;
  port: number;
  host: string;
  logLevel: string;
  debug: boolean;
  enableDevTools: boolean;
}

// 从环境文件加载配置
function loadEnvFile(env: Environment): Record<string, string> {
  try {
    // 使用绝对路径
    const envPath = join(process.cwd(), 'app', 'lib', 'config', 'environments', `${env}.env`);
    console.log(`Loading environment file: ${envPath}`);
    const envContent = readFileSync(envPath, 'utf-8');
    
    const envVars: Record<string, string> = {};
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
    
    console.log(`Loaded environment variables:`, Object.keys(envVars));
    return envVars;
  } catch (error) {
    console.warn(`Warning: Could not load ${env}.env file:`, error);
    return {};
  }
}

// 创建配置对象的辅助函数
function createConfig(env: Environment, envVars: Record<string, string>): AppConfig {
  return {
    nodeEnv: env,
    database: {
      url: envVars.DATABASE_URL || process.env.DATABASE_URL || '',
      host: envVars.DB_HOST || process.env.DB_HOST || 'localhost',
      port: parseInt(envVars.DB_PORT || process.env.DB_PORT || '3306'),
      database: envVars.DB_NAME || process.env.DB_NAME || `procure_sales_${env}`,
      username: envVars.DB_USER || process.env.DB_USER || 'root',
      password: envVars.DB_PASSWORD || process.env.DB_PASSWORD || 'password',
    },
    sessionSecret: envVars.SESSION_SECRET || process.env.SESSION_SECRET || '',
    port: parseInt(envVars.PORT || process.env.PORT || '8080'),
    host: envVars.HOST || process.env.HOST || 'localhost',
    logLevel: envVars.LOG_LEVEL || process.env.LOG_LEVEL || 'info',
    debug: envVars.DEBUG === 'true' || process.env.DEBUG === 'true' || false,
    enableDevTools: envVars.ENABLE_DEV_TOOLS === 'true' || process.env.ENABLE_DEV_TOOLS === 'true' || false,
  };
}

// 根据 NODE_ENV 选择配置
function getConfig(): AppConfig {
  const nodeEnv = (process.env.NODE_ENV as Environment) || 'development';
  
  // 从环境文件加载配置
  const envVars = loadEnvFile(nodeEnv);
  
  // 立即设置环境变量到 process.env（用于 Prisma 等第三方库）
  Object.entries(envVars).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
  
  // 创建配置对象
  const config = createConfig(nodeEnv, envVars);
  
  // 设置环境变量到 process.env（用于 Prisma 等第三方库）
  setEnvironmentVariables(config);
  
  return config;
}

export const config = getConfig();

// 验证必需的环境变量
export function validateConfig(): void {
  const errors: string[] = [];

  if (!config.database.url) {
    errors.push('DATABASE_URL is required');
  }

  if (config.nodeEnv === 'production') {
    if (!config.sessionSecret || config.sessionSecret === 'dev-secret-key-change-in-production') {
      errors.push('SESSION_SECRET must be set in production');
    }
    if (!config.database.password) {
      errors.push('Database password must be set in production');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

// 导出环境变量设置函数
export function setEnvironmentVariables(config: AppConfig): void {
  // 设置数据库连接字符串
  process.env.DATABASE_URL = config.database.url;
  
  // 设置其他环境变量
  process.env.NODE_ENV = config.nodeEnv;
  process.env.SESSION_SECRET = config.sessionSecret;
  process.env.PORT = config.port.toString();
  process.env.HOST = config.host;
  process.env.LOG_LEVEL = config.logLevel;
  process.env.DEBUG = config.debug.toString();
  process.env.ENABLE_DEV_TOOLS = config.enableDevTools.toString();
}
