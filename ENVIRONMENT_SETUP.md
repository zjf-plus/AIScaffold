# 环境配置说明

本项目支持多环境配置，包括开发、测试和生产环境。

## 环境配置

### 开发环境 (development)

- 默认环境
- 使用本地数据库
- 启用详细日志
- 热重载支持

### 测试环境 (test)

- 用于运行测试
- 使用独立的测试数据库
- 禁用详细日志

### 生产环境 (production)

- 生产部署环境
- 使用生产数据库
- 最小化日志输出
- 严格的安全验证

## 配置方式

### 1. 环境变量设置

项目会自动根据 `NODE_ENV` 环境变量选择对应的配置：

```bash
# 开发环境
NODE_ENV=development

# 测试环境
NODE_ENV=test

# 生产环境
NODE_ENV=production
```

### 2. 数据库配置

#### 开发环境

```bash
DATABASE_URL="mysql://root:password@localhost:3306/procure_sales_dev"
```

#### 测试环境

```bash
DATABASE_URL="mysql://root:password@localhost:3306/procure_sales_test"
```

#### 生产环境

```bash
DATABASE_URL="mysql://username:password@your-production-host:3306/procure_sales_prod"
```

### 3. 其他环境变量

```bash
# 会话密钥
SESSION_SECRET="your-secret-key-here"

# 服务器端口
PORT=8080

# 服务器主机
HOST=localhost
```

## 使用方法

### 开发环境启动

```bash
npm run dev
```

### 测试环境运行

```bash
NODE_ENV=test npm run test
```

### 生产环境部署

```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

## 配置验证

项目启动时会自动验证配置：

- 开发环境：警告缺失的配置，但允许继续运行
- 生产环境：严格验证，缺失关键配置会终止启动

## 安全注意事项

1. **生产环境**必须设置强密码的 `SESSION_SECRET`
2. **生产环境**必须设置安全的数据库密码
3. 不要在代码中硬编码敏感信息
4. 使用环境变量管理所有敏感配置

## 故障排除

### 常见问题

1. **DATABASE_URL 未找到**

   - 确保设置了正确的环境变量
   - 检查数据库服务是否运行

2. **配置验证失败**

   - 检查必需的环境变量是否设置
   - 查看控制台错误信息

3. **数据库连接失败**
   - 验证数据库连接字符串
   - 检查数据库服务状态
   - 确认网络连接
