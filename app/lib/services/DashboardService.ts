import { ProcurementService } from './ProcurementService';
import { SalesService } from './SalesService';
import { AssetService } from './AssetService';

export class DashboardService {
  private procurementService: ProcurementService;
  private salesService: SalesService;
  private assetService: AssetService;

  constructor() {
    this.procurementService = new ProcurementService();
    this.salesService = new SalesService();
    this.assetService = new AssetService();
  }

  // 获取仪表板数据
  async getDashboardData(): Promise<{
    procurementStats: any;
    salesStats: any;
    assetStats: any;
    recentActivities: any[];
    quickActions: any[];
  }> {
    try {
      const [procurementStats, salesStats, assetStats] = await Promise.all([
        this.procurementService.getProcurementStats(),
        this.salesService.getSalesStats(),
        this.assetService.getAssetStats()
      ]);

      // 模拟最近活动数据
      const recentActivities = [
        { id: 1, action: "新增采购订单", time: "2小时前", type: "procurement" },
        { id: 2, action: "完成销售交易", time: "4小时前", type: "sales" },
        { id: 3, action: "更新资产信息", time: "6小时前", type: "assets" },
        { id: 4, action: "生成月度报表", time: "1天前", type: "reports" },
      ];

      // 快速操作
      const quickActions = [
        { id: 1, name: "新建采购订单", icon: "ShoppingCart", href: "/procurement" },
        { id: 2, name: "记录销售", icon: "TrendingUp", href: "/sales" },
        { id: 3, name: "添加资产", icon: "Package", href: "/assets" },
        { id: 4, name: "管理客户", icon: "Users", href: "/customers" },
        { id: 5, name: "生成报表", icon: "FileText", href: "/reports" },
      ];

      return {
        procurementStats,
        salesStats,
        assetStats,
        recentActivities,
        quickActions
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  // 获取系统概览
  async getSystemOverview(): Promise<{
    totalUsers: number;
    totalSuppliers: number;
    totalCustomers: number;
    systemHealth: 'good' | 'warning' | 'critical';
  }> {
    // TODO: 实现获取系统概览的业务逻辑
    return {
      totalUsers: 0,
      totalSuppliers: 0,
      totalCustomers: 0,
      systemHealth: 'good'
    };
  }

  // 获取资产统计
  async getAssetStats(): Promise<any> {
    try {
      return await this.assetService.getAssetStats();
    } catch (error) {
      console.error('Error fetching asset stats:', error);
      return {
        totalAssets: 0,
        activeAssets: 0,
        maintenanceDue: 0,
        totalValue: 0
      };
    }
  }

  // 获取最近资产
  async getRecentAssets(): Promise<any[]> {
    try {
      return await this.assetService.getRecentAssets();
    } catch (error) {
      console.error('Error fetching recent assets:', error);
      return [];
    }
  }

  // 获取维护提醒
  async getMaintenanceAlerts(): Promise<any[]> {
    try {
      return await this.assetService.getMaintenanceAlerts();
    } catch (error) {
      console.error('Error fetching maintenance alerts:', error);
      return [];
    }
  }

  // 获取采购统计
  async getProcurementStats(): Promise<any> {
    try {
      return await this.procurementService.getProcurementStats();
    } catch (error) {
      console.error('Error fetching procurement stats:', error);
      return {
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalValue: 0
      };
    }
  }

  // 获取销售统计
  async getSalesStats(): Promise<any> {
    try {
      return await this.salesService.getSalesStats();
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      return {
        totalSales: 0,
        pendingSales: 0,
        completedSales: 0,
        totalRevenue: 0
      };
    }
  }
}
