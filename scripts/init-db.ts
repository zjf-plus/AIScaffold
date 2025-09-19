#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 开始初始化数据库...');
  
  try {
    // 测试数据库连接
    await prisma.$connect();
    console.log('✅ 数据库连接成功');
    
    // 检查是否已有数据
    const userCount = await prisma.user.count();
    const customerCount = await prisma.customer.count();
    const supplierCount = await prisma.supplier.count();
    const assetCount = await prisma.asset.count();
    
    if (userCount > 0 || customerCount > 0 || supplierCount > 0 || assetCount > 0) {
      console.log('📊 数据库已包含数据:');
      console.log(`   - 用户: ${userCount}`);
      console.log(`   - 客户: ${customerCount}`);
      console.log(`   - 供应商: ${supplierCount}`);
      console.log(`   - 资产: ${assetCount}`);
      console.log('✅ 数据库已初始化，无需重复初始化');
    } else {
      console.log('📝 数据库为空，开始插入示例数据...');
      
      // 创建示例用户
      const adminUser = await prisma.user.create({
        data: {
          username: 'admin',
          email: 'admin@example.com',
          password: 'admin123', // 注意：实际应用中应该加密密码
          role: 'admin'
        }
      });
      
      const normalUser = await prisma.user.create({
        data: {
          username: 'user1',
          email: 'user1@example.com',
          password: 'user123',
          role: 'user'
        }
      });
      
      // 创建示例客户
      const customer1 = await prisma.customer.create({
        data: {
          name: '张三',
          email: 'zhangsan@company.com',
          phone: '13800138001',
          address: '北京市朝阳区',
          company: '北京科技有限公司'
        }
      });
      
      const customer2 = await prisma.customer.create({
        data: {
          name: '李四',
          email: 'lisi@company.com',
          phone: '13800138002',
          address: '上海市浦东新区',
          company: '上海贸易有限公司'
        }
      });
      
      // 创建示例供应商
      const supplier1 = await prisma.supplier.create({
        data: {
          name: '华为技术有限公司',
          email: 'contact@huawei.com',
          phone: '400-822-9999',
          address: '深圳市龙岗区',
          contactPerson: '王经理'
        }
      });
      
      const supplier2 = await prisma.supplier.create({
        data: {
          name: '联想集团',
          email: 'contact@lenovo.com',
          phone: '400-990-8888',
          address: '北京市海淀区',
          contactPerson: '刘经理'
        }
      });
      
      // 创建示例资产
      const asset1 = await prisma.asset.create({
        data: {
          name: 'MacBook Pro 16寸',
          description: '苹果笔记本电脑，用于开发工作',
          category: '电脑设备',
          status: 'active',
          purchasePrice: 19999.00,
          currentValue: 15000.00,
          purchaseDate: new Date('2023-01-15'),
          warrantyExpiry: new Date('2026-01-15'),
          location: '办公室A区',
          serialNumber: 'MBP2023001'
        }
      });
      
      const asset2 = await prisma.asset.create({
        data: {
          name: 'Dell 显示器 27寸',
          description: '4K显示器，用于设计工作',
          category: '显示器',
          status: 'active',
          purchasePrice: 2999.00,
          currentValue: 2000.00,
          purchaseDate: new Date('2023-03-20'),
          warrantyExpiry: new Date('2026-03-20'),
          location: '办公室B区',
          serialNumber: 'DELL2023002'
        }
      });
      
      console.log('✅ 示例数据插入完成！');
      console.log(`   - 用户: 2个 (admin, user1)`);
      console.log(`   - 客户: 2个 (张三, 李四)`);
      console.log(`   - 供应商: 2个 (华为, 联想)`);
      console.log(`   - 资产: 2个 (MacBook Pro, Dell显示器)`);
    }
    
    console.log('🎉 数据库初始化完成！');
    console.log('🔗 请确保MySQL服务正在运行，并检查.env文件中的数据库配置');
    
  } catch (error) {
    console.error('❌ 初始化过程中发生错误:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
