import { db } from '../prisma.server';
import type { Sales, SalesCreateInput, SalesUpdateInput } from '../types/Sales';

export class SalesService {
  constructor() {
    // Prisma 客户端已全局配置
  }

  async getAllSales(): Promise<Sales[]> {
    const sales = await db.salesOrder.findMany({
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return sales.map(sale => ({
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    }));
  }

  async getSalesById(id: string): Promise<Sales | null> {
    const sale = await db.salesOrder.findUnique({
      where: { id: parseInt(id) },
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    if (!sale) return null;
    
    return {
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    };
  }

  async getSalesByOrderNumber(orderNumber: string): Promise<Sales | null> {
    const sale = await db.salesOrder.findUnique({
      where: { orderNumber },
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    if (!sale) return null;
    
    return {
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    };
  }

  async getSalesByStatus(status: string): Promise<Sales[]> {
    const sales = await db.salesOrder.findMany({
      where: { status: status as any },
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return sales.map(sale => ({
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    }));
  }

  async getSalesByCustomer(customerId: string): Promise<Sales[]> {
    const sales = await db.salesOrder.findMany({
      where: { customerId: parseInt(customerId) },
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return sales.map(sale => ({
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    }));
  }

  async createSales(data: SalesCreateInput): Promise<Sales> {
    // 生成订单号
    const orderNumber = this.generateOrderNumber();
    
    // 计算总金额
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const sale = await db.salesOrder.create({
      data: {
        orderNumber,
        customerId: parseInt(data.customerId),
        status: 'pending',
        totalAmount,
        orderDate: new Date(),
        deliveryDate: data.expectedDeliveryDate,
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
        customer: {
          select: {
            name: true
          }
        },
        items: true
      }
    });
    
    return {
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    };
  }

  async updateSales(id: string, data: SalesUpdateInput): Promise<Sales | null> {
    const existingSale = await db.salesOrder.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingSale) {
      throw new Error('Sales not found');
    }

    try {
      // 如果更新了 items，需要重新计算总金额
      let totalAmount = existingSale.totalAmount;
      if (data.items) {
        totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }

      const sale = await db.salesOrder.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.customerId && { customerId: parseInt(data.customerId) }),
          ...(data.status && { status: data.status }),
          ...(data.expectedDeliveryDate && { deliveryDate: data.expectedDeliveryDate }),
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
          customer: {
            select: {
              name: true
            }
          },
          items: true
        }
      });
      
      return {
        id: sale.id.toString(),
        orderNumber: sale.orderNumber,
        customerId: sale.customerId.toString(),
        customerName: sale.customer.name,
        items: sale.items.map(item => ({
          id: item.id.toString(),
          assetName: item.assetName,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.totalPrice)
        })),
        totalAmount: Number(sale.totalAmount),
        status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
        orderDate: sale.orderDate,
        expectedDeliveryDate: sale.deliveryDate,
        salespersonId: '1', // TODO: 从认证系统获取
        salespersonName: 'System User', // TODO: 从用户表获取
        notes: '', // TODO: 添加 notes 字段到 schema
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  async deleteSales(id: string): Promise<boolean> {
    const existingSale = await db.salesOrder.findUnique({
      where: { id: parseInt(id) }
    });
    if (!existingSale) {
      throw new Error('Sales not found');
    }

    try {
      await db.salesOrder.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async confirmSales(id: string): Promise<Sales | null> {
    return await this.updateSales(id, { 
      status: 'confirmed' 
    });
  }

  async shipSales(id: string): Promise<Sales | null> {
    return await this.updateSales(id, { 
      status: 'shipped' 
    });
  }

  async deliverSales(id: string): Promise<Sales | null> {
    return await this.updateSales(id, { 
      status: 'delivered' 
    });
  }

  async cancelSales(id: string): Promise<Sales | null> {
    return await this.updateSales(id, { 
      status: 'cancelled' 
    });
  }

  async searchSales(query: string): Promise<Sales[]> {
    const sales = await db.salesOrder.findMany({
      where: {
        OR: [
          { orderNumber: { contains: query } },
          { customer: { name: { contains: query } } }
        ]
      },
      include: {
        customer: {
          select: {
            name: true
          }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return sales.map(sale => ({
      id: sale.id.toString(),
      orderNumber: sale.orderNumber,
      customerId: sale.customerId.toString(),
      customerName: sale.customer.name,
      items: sale.items.map(item => ({
        id: item.id.toString(),
        assetName: item.assetName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      totalAmount: Number(sale.totalAmount),
      status: sale.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
      orderDate: sale.orderDate,
      expectedDeliveryDate: sale.deliveryDate,
      salespersonId: '1', // TODO: 从认证系统获取
      salespersonName: 'System User', // TODO: 从用户表获取
      notes: '', // TODO: 添加 notes 字段到 schema
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt
    }));
  }

  async getSalesStats(): Promise<{
    totalOrders: number;
    totalAmount: number;
    pendingOrders: number;
    confirmedOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    monthlyRevenue: number;
  }> {
    const [totalOrders, pendingOrders, confirmedOrders, shippedOrders, deliveredOrders, cancelledOrders, totalAmountResult] = await Promise.all([
      db.salesOrder.count(),
      db.salesOrder.count({ where: { status: 'pending' } }),
      db.salesOrder.count({ where: { status: 'confirmed' } }),
      db.salesOrder.count({ where: { status: 'shipped' } }),
      db.salesOrder.count({ where: { status: 'delivered' } }),
      db.salesOrder.count({ where: { status: 'cancelled' } }),
      db.salesOrder.aggregate({
        _sum: {
          totalAmount: true
        }
      })
    ]);

    // 计算本月收入
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyRevenueResult = await db.salesOrder.aggregate({
      where: {
        status: 'delivered',
        orderDate: {
          gte: startOfMonth
        }
      },
      _sum: {
        totalAmount: true
      }
    });
    
    return {
      totalOrders,
      totalAmount: Number(totalAmountResult._sum.totalAmount || 0),
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      monthlyRevenue: Number(monthlyRevenueResult._sum.totalAmount || 0)
    };
  }

  // 生成订单号
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `SO-${timestamp}-${random}`;
  }
}