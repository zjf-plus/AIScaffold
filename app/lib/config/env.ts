import { config } from 'dotenv';
import path from 'path';

// 获取当前环境
const NODE_ENV = process.env.NODE_ENV || 'development';

// 根据环境加载对应的配置文件
const envFile = path.join(process.cwd(), 'app', 'lib', 'config', 'environments', `${NODE_ENV}.env`);

// 加载环境变量
config({ path: envFile });

// 环境配置接口
export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  HOST: string;
  
  // 数据库配置
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  
  // 日志配置
  LOG_LEVEL: string;
  LOG_FILE: string;
  
  // 安全配置
  SESSION_SECRET: string;
  JWT_SECRET: string;
  
  // 缓存配置
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  
  // 文件上传配置
  UPLOAD_DIR: string;
  MAX_FILE_SIZE: number;
  
  // 邮件配置
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  SMTP_FROM: string;
  
  // 调试配置
  DEBUG: boolean;
  ENABLE_SWAGGER: boolean;
  ENABLE_CORS: boolean;
  
  // SSL配置（生产环境）
  SSL_CERT_PATH?: string;
  SSL_KEY_PATH?: string;
  
  // 监控配置（生产环境）
  ENABLE_MONITORING?: boolean;
  METRICS_PORT?: number;
}

// 环境变量验证
function validateEnv(): EnvConfig {
  const requiredVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'SESSION_SECRET',
    'JWT_SECRET'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    HOST: process.env.HOST || 'localhost',
    
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_NAME: process.env.DB_NAME!,
    
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    LOG_FILE: process.env.LOG_FILE || 'logs/app.log',
    
    SESSION_SECRET: process.env.SESSION_SECRET!,
    JWT_SECRET: process.env.JWT_SECRET!,
    
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    
    UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    
    SMTP_HOST: process.env.SMTP_HOST || 'localhost',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM || 'noreply@localhost',
    
    DEBUG: process.env.DEBUG === 'true',
    ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',
    ENABLE_CORS: process.env.ENABLE_CORS === 'true',
    
    SSL_CERT_PATH: process.env.SSL_CERT_PATH,
    SSL_KEY_PATH: process.env.SSL_KEY_PATH,
    
    ENABLE_MONITORING: process.env.ENABLE_MONITORING === 'true',
    METRICS_PORT: process.env.METRICS_PORT ? parseInt(process.env.METRICS_PORT, 10) : undefined,
  };
}

// 导出验证后的配置
export const env = validateEnv();

// 导出环境检查函数
export const isDevelopment = () => env.NODE_ENV === 'development';
export const isProduction = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';

// 导出数据库连接字符串
export const getDatabaseUrl = () => {
  return `mysql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
};

// 导出Redis连接字符串
export const getRedisUrl = () => {
  const auth = env.REDIS_PASSWORD ? `:${env.REDIS_PASSWORD}@` : '';
  return `redis://${auth}${env.REDIS_HOST}:${env.REDIS_PORT}`;
};
