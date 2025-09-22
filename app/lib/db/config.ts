import { PrismaClient } from "@prisma/client";
import { config, setEnvironmentVariables, validateConfig } from "~/lib/config/env";

// 设置环境变量
setEnvironmentVariables(config);

declare global {
  var __db__: PrismaClient;
}

let db: PrismaClient;

// 验证配置
try {
  validateConfig();
} catch (error) {
  console.error('Configuration validation failed:', error);
  if (config.nodeEnv === 'production') {
    process.exit(1);
  }
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production we'll have a single connection to the DB.
if (config.nodeEnv === "production") {
  db = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  db = global.__db__;
  db.$connect();
}

export { db };
