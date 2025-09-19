import { db } from '../prisma.server';
import type { Procurement, ProcurementCreateInput, ProcurementUpdateInput } from '../types/Procurement';

export class ProcurementService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllProcurements(): Promise<Procurement[]> {
    const procurements = await db.procurementOrder.findMany({
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return procurements.map(procurement => ({
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    }));
  }

  async getProcurementById(id: string): Promise<Procurement | null> {
    const procurement = await db.procurementOrder.findUnique({
      where: { id: parseInt(id) },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    if (!procurement) return null;
    
    return {
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    };
  }

  async getProcurementByOrderNumber(orderNumber: string): Promise<Procurement | null> {
    const procurement = await db.procurementOrder.findUnique({
      where: { orderNumber },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    if (!procurement) return null;
    
    return {
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    };
  }

  async getProcurementsByStatus(status: string): Promise<Procurement[]> {
    const procurements = await db.procurementOrder.findMany({
      where: { status: status as any },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return procurements.map(procurement => ({
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    }));
  }

  async getProcurementsBySupplier(supplierId: string): Promise<Procurement[]> {
    const procurements = await db.procurementOrder.findMany({
      where: { supplierId: parseInt(supplierId) },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return procurements.map(procurement => ({
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    }));
  }

  async createProcurement(data: ProcurementCreateInput): Promise<Procurement> {
    // 生成订单号
    const orderNumber = this.generateOrderNumber();
    
    // 计算总金额
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const procurement = await db.procurementOrder.create({
      data: {
        orderNumber,
        supplierId: parseInt(data.supplierId),
        status: 'pending',
        totalAmount,
        orderDate: new Date(),
        expectedDelivery: data.expectedDeliveryDate,
        items: {
          create: data.items.map(item => ({
            assetName: item.assetName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice
          }))
        }
      },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    return {
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    };
  }

  async updateProcurement(id: string, data: ProcurementUpdateInput): Promise<Procurement | null> {
    const existingProcurement = await db.procurementOrder.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingProcurement) {
      throw new Error('Procurement not found');
    }

    try {
      // 如果更新了 items，需要重新计算总金额
      let totalAmount = existingProcurement.totalAmount;
      if (data.items) {
        totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }

      const procurement = await db.procurementOrder.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.supplierId && { supplierId: parseInt(data.supplierId) }),
          ...(data.status && { status: data.status }),
          ...(data.expectedDeliveryDate && { expectedDelivery: data.expectedDeliveryDate }),
          ...(data.items && {
            items: {
              deleteMany: {},
              create: data.items.map(item => ({
                assetName: item.assetName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice
              }))
            }
          }),
          ...(data.items && { totalAmount })
        },
        include: {
          supplier: {
            select: {
              name: true
            }
          },
          items: true
        }
      });
      
      return {
        id: procurement.id.toString(),
        orderNumber: procurement.orderNumber,
        supplierId: procurement.supplierId.toString(),
        supplierName: procurement.supplier.name,
        items: procurement.items.map(item => ({
          id: item.id.toString(),
          assetName: item.assetName,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.totalPrice)
        })),
        totalAmount: Number(procurement.totalAmount),
        status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
        orderDate: procurement.orderDate,
        expectedDeliveryDate: procurement.expectedDelivery,
        createdBy: 'system', // TODO: 从认证系统获取
        notes: '', // TODO: 添加 notes 字段到 schema
        createdAt: procurement.createdAt,
        updatedAt: procurement.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  async deleteProcurement(id: string): Promise<boolean> {
    const existingProcurement = await db.procurementOrder.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingProcurement) {
      throw new Error('Procurement not found');
    }

    try {
      await db.procurementOrder.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async approveProcurement(id: string, approvedBy: string): Promise<Procurement | null> {
    return await this.updateProcurement(id, { 
      status: 'approved' 
    });
  }

  async rejectProcurement(id: string): Promise<Procurement | null> {
    return await this.updateProcurement(id, { 
      status: 'rejected' 
    });
  }

  async completeProcurement(id: string): Promise<Procurement | null> {
    return await this.updateProcurement(id, { 
      status: 'completed' 
    });
  }

  async searchProcurements(query: string): Promise<Procurement[]> {
    const procurements = await db.procurementOrder.findMany({
      where: {
        OR: [
          { orderNumber: { contains: query } },
          { supplier: { name: { contains: query } } }
        ]
      },
      include: {
        supplier: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return procurements.map(procurement => ({
      id: procurement.id.toString(),
      orderNumber: procurement.orderNumber,
      supplierId: procurement.supplierId.toString(),
      supplierName: procurement.supplier.name,
      items: procurement.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(procurement.totalAmount),
      status: procurement.status as 'pending' | 'approved' | 'rejected' | 'completed',
      orderDate: procurement.orderDate,
      expectedDeliveryDate: procurement.expectedDelivery,
      createdBy: 'system', // TODO: 从认证系统获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: procurement.createdAt,
      updatedAt: procurement.updatedAt
    }));
  }

  async getProcurementStats(): Promise<{
    totalOrders: number;
    totalAmount: number;
    pendingOrders: number;
    approvedOrders: number;
    completedOrders: number;
    rejectedOrders: number;
  }> {
    const [totalOrders, pendingOrders, approvedOrders, completedOrders, rejectedOrders, totalAmountResult] = await Promise.all([
      db.procurementOrder.count(),
      db.procurementOrder.count({ where: { status: 'pending' } }),
      db.procurementOrder.count({ where: { status: 'approved' } }),
      db.procurementOrder.count({ where: { status: 'completed' } }),
      db.procurementOrder.count({ where: { status: 'rejected' } }),
      db.procurementOrder.aggregate({
        _sum: {
          totalAmount: true
        }
      })
    ]);
    
    return {
      totalOrders,
      totalAmount: Number(totalAmountResult._sum.totalAmount || 0),
      pendingOrders,
      approvedOrders,
      completedOrders,
      rejectedOrders
    };
  }

  // 生成订单号
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `PO-${timestamp}-${random}`;
  }
}