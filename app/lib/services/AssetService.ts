import { db } from '../prisma.server';
import type { Asset, AssetCreateInput, AssetUpdateInput } from '../types/Asset';

export class AssetService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllAssets(): Promise<Asset[]> {
    const assets = await db.asset.findMany({
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async getAssetById(id: string): Promise<Asset | null> {
    const asset = await db.asset.findUnique({
      where: { id: parseInt(id) },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      }
    });
    
    if (!asset) return null;
    
    return {
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    };
  }

  async getAssetByCode(asset_code: string): Promise<Asset | null> {
    const asset = await db.asset.findUnique({
      where: { assetCode: asset_code },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      }
    });
    
    if (!asset) return null;
    
    return {
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    };
  }

  async getAssetsByStatus(status: string): Promise<Asset[]> {
    const assets = await db.asset.findMany({
      where: { status: status as any },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async getAssetsByDepartment(department: string): Promise<Asset[]> {
    const assets = await db.asset.findMany({
      where: { department },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async getAssetsByAssignedTo(assigned_to: string): Promise<Asset[]> {
    const assets = await db.asset.findMany({
      where: { assignedTo: parseInt(assigned_to) },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async createAsset(data: AssetCreateInput): Promise<Asset> {
    // 生成资产代码
    const assetCode = this.generateAssetCode();
    
    const asset = await db.asset.create({
      data: {
        assetCode,
      assetName: data.assetName,
      category: data.category,
      subCategory: data.subCategory,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      purchaseDate: data.purchaseDate,
      purchasePrice: data.purchasePrice,
        currentValue: data.purchasePrice, // 初始价值等于购买价格
      status: 'active',
      location: data.location,
      department: data.department,
        assignedTo: data.assignedTo ? parseInt(data.assignedTo) : null,
      warrantyExpiry: data.warrantyExpiry,
      description: data.description,
        specifications: data.specifications
      },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      }
    });
    
    return {
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    };
  }

  async updateAsset(id: string, data: AssetUpdateInput): Promise<Asset | null> {
    const existingAsset = await db.asset.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingAsset) {
      throw new Error('Asset not found');
    }

    try {
      const asset = await db.asset.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.assetName && { assetName: data.assetName }),
          ...(data.category && { category: data.category }),
          ...(data.subCategory !== undefined && { subCategory: data.subCategory }),
          ...(data.brand !== undefined && { brand: data.brand }),
          ...(data.model !== undefined && { model: data.model }),
          ...(data.serialNumber !== undefined && { serialNumber: data.serialNumber }),
          ...(data.purchaseDate && { purchaseDate: data.purchaseDate }),
          ...(data.purchasePrice !== undefined && { purchasePrice: data.purchasePrice }),
          ...(data.currentValue !== undefined && { currentValue: data.currentValue }),
          ...(data.status && { status: data.status }),
          ...(data.location && { location: data.location }),
          ...(data.department && { department: data.department }),
          ...(data.assignedTo !== undefined && { assignedTo: data.assignedTo ? parseInt(data.assignedTo) : null }),
          ...(data.warrantyExpiry !== undefined && { warrantyExpiry: data.warrantyExpiry }),
          ...(data.lastMaintenanceDate !== undefined && { lastMaintenanceDate: data.lastMaintenanceDate }),
          ...(data.nextMaintenanceDate !== undefined && { nextMaintenanceDate: data.nextMaintenanceDate }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.specifications !== undefined && { specifications: data.specifications })
        },
        include: {
          assignedToUser: {
            select: {
              username: true
            }
          }
        }
      });
      
      return {
        id: asset.id.toString(),
        assetCode: asset.assetCode,
        assetName: asset.assetName,
        category: asset.category,
        subCategory: asset.subCategory,
        brand: asset.brand,
        model: asset.model,
        serialNumber: asset.serialNumber,
        purchaseDate: asset.purchaseDate,
        purchasePrice: asset.purchasePrice,
        currentValue: asset.currentValue,
        status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
        location: asset.location,
        department: asset.department,
        assignedTo: asset.assignedTo?.toString(),
        assignedToName: asset.assignedToUser?.username,
        warrantyExpiry: asset.warrantyExpiry,
        lastMaintenanceDate: asset.lastMaintenanceDate,
        nextMaintenanceDate: asset.nextMaintenanceDate,
        description: asset.description,
        specifications: asset.specifications as Record<string, any>,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt
      };
    } catch (error) {
    return null;
    }
  }

  async deleteAsset(id: string): Promise<boolean> {
    const existingAsset = await db.asset.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingAsset) {
      throw new Error('Asset not found');
    }

    try {
      await db.asset.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
    return false;
    }
  }

  async searchAssets(query: string): Promise<Asset[]> {
    const assets = await db.asset.findMany({
      where: {
        OR: [
          { assetName: { contains: query } },
          { assetCode: { contains: query } },
          { serialNumber: { contains: query } }
        ]
      },
      include: {
        assignedToUser: {
          select: {
            username: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      id: asset.id.toString(),
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.category,
      subCategory: asset.subCategory,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      status: asset.status as 'active' | 'maintenance' | 'retired' | 'disposed',
      location: asset.location,
      department: asset.department,
      assignedTo: asset.assignedTo?.toString(),
      assignedToName: asset.assignedToUser?.username,
      warrantyExpiry: asset.warrantyExpiry,
      lastMaintenanceDate: asset.lastMaintenanceDate,
      nextMaintenanceDate: asset.nextMaintenanceDate,
      description: asset.description,
      specifications: asset.specifications as Record<string, any>,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt
    }));
  }

  async getAssetStats(): Promise<{
    total: number;
    active: number;
    maintenance: number;
    retired: number;
    disposed: number;
  }> {
    const [total, active, maintenance, retired, disposed] = await Promise.all([
      db.asset.count(),
      db.asset.count({ where: { status: 'active' } }),
      db.asset.count({ where: { status: 'maintenance' } }),
      db.asset.count({ where: { status: 'retired' } }),
      db.asset.count({ where: { status: 'disposed' } })
    ]);
    
    return { total, active, maintenance, retired, disposed };
  }

  async updateAssetStatus(id: string, status: 'active' | 'maintenance' | 'retired' | 'disposed'): Promise<Asset | null> {
    return await this.updateAsset(id, { status });
  }

  async assignAsset(id: string, assigned_to: string): Promise<Asset | null> {
    return await this.updateAsset(id, { assignedTo: assigned_to });
  }

  async unassignAsset(id: string): Promise<Asset | null> {
    return await this.updateAsset(id, { assignedTo: undefined });
  }

  async updateAssetValue(id: string, current_value: number): Promise<Asset | null> {
    return await this.updateAsset(id, { currentValue: current_value });
  }

  async scheduleMaintenance(id: string, next_maintenance_date: Date): Promise<Asset | null> {
    return await this.updateAsset(id, { nextMaintenanceDate: next_maintenance_date });
  }

  async completeMaintenance(id: string): Promise<Asset | null> {
    const now = new Date();
    return await this.updateAsset(id, { 
      lastMaintenanceDate: now,
      status: 'active'
    });
  }

  // 生成资产代码
  private generateAssetCode(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `AST-${timestamp}-${random}`;
  }
}