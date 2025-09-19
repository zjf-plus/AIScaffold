#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';
import { AssetService } from '../app/lib/services/AssetService';

const prisma = new PrismaClient();

async function testDatabaseOperations() {
  console.log('🧪 开始测试数据库操作...');
  
  try {
    // 测试数据库连接
    console.log('1. 测试数据库连接...');
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    // 测试资产服务
    console.log('2. 测试资产服务...');
    const assetService = new AssetService();

    // 创建测试资产
    console.log('   创建测试资产...');
    const testAsset = await assetService.createAsset({
      name: '测试笔记本电脑',
      description: '用于测试的笔记本电脑',
      category: 'IT设备',
      status: 'active',
      purchasePrice: 8999.00,
      currentValue: 8000.00,
      purchaseDate: new Date('2024-01-15'),
      warrantyExpiry: new Date('2027-01-15'),
      location: 'IT部门',
      serialNumber: 'TEST-001'
    });
    console.log('✅ 资产创建成功:', testAsset.name);

    // 获取所有资产
    console.log('   获取所有资产...');
    const allAssets = await assetService.getAllAssets();
    console.log(`✅ 获取到 ${allAssets.length} 个资产`);

    // 根据ID获取资产
    console.log('   根据ID获取资产...');
    const assetById = await assetService.getAssetById(testAsset.id);
    if (assetById) {
      console.log('✅ 根据ID获取资产成功:', assetById.name);
    } else {
      console.log('❌ 根据ID获取资产失败');
    }

    // 更新资产
    console.log('   更新资产...');
    const updatedAsset = await assetService.updateAsset(testAsset.id, {
      currentValue: 7500.00,
      description: '更新后的描述'
    });
    if (updatedAsset) {
      console.log('✅ 资产更新成功:', updatedAsset.description);
    } else {
      console.log('❌ 资产更新失败');
    }

    // 搜索资产
    console.log('   搜索资产...');
    const searchResults = await assetService.searchAssets('测试');
    console.log(`✅ 搜索到 ${searchResults.length} 个匹配的资产`);

    // 获取资产统计
    console.log('   获取资产统计...');
    const stats = await assetService.getAssetStats();
    console.log('✅ 资产统计:', stats);

    // 删除测试资产
    console.log('   删除测试资产...');
    const deleted = await assetService.deleteAsset(testAsset.id);
    if (deleted) {
      console.log('✅ 资产删除成功');
    } else {
      console.log('❌ 资产删除失败');
    }

    console.log('🎉 所有数据库操作测试完成！');

  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await testDatabaseOperations();
  process.exit(0);
}

main();
