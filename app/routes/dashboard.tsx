import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { DashboardService } from "~/lib/services/DashboardService";

export async function loader({ request }: LoaderFunctionArgs) {
  const dashboardService = new DashboardService();
  
  try {
    const [
      assetStats,
      recentAssets,
      maintenanceAlerts,
      procurementStats,
      salesStats
    ] = await Promise.all([
      dashboardService.getAssetStats(),
      dashboardService.getRecentAssets(),
      dashboardService.getMaintenanceAlerts(),
      dashboardService.getProcurementStats(),
      dashboardService.getSalesStats()
    ]);

    return {
      assetStats,
      recentAssets,
      maintenanceAlerts,
      procurementStats,
      salesStats
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return { error: "Failed to load dashboard data" };
  }
}

export default function Dashboard() {
  const { assetStats, recentAssets, maintenanceAlerts, procurementStats, salesStats } = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
        <p className="text-gray-600">系统概览和关键指标</p>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">总资产</h3>
              <p className="text-2xl font-bold text-gray-900">{assetStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">使用中</h3>
              <p className="text-2xl font-bold text-green-600">{assetStats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">维护中</h3>
              <p className="text-2xl font-bold text-yellow-600">{assetStats.maintenance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">总价值</h3>
              <p className="text-2xl font-bold text-gray-900">¥{assetStats.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近添加的资产 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">最近添加的资产</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAssets?.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asset.asset_name}</p>
                    <p className="text-sm text-gray-500">{asset.asset_code} • {asset.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">¥{asset.current_value.toLocaleString()}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      asset.status === 'active' ? 'bg-green-100 text-green-800' :
                      asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {asset.status === 'active' ? '使用中' :
                       asset.status === 'maintenance' ? '维护中' : '其他'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 维护提醒 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">维护提醒</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {maintenanceAlerts?.length > 0 ? (
                maintenanceAlerts?.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.asset_name}</p>
                      <p className="text-sm text-gray-500">下次维护: {new Date(alert.next_maintenance_date).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs text-yellow-600 font-medium">
                      {alert.days_until_maintenance} 天后
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">暂无维护提醒</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 采购和销售统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">采购统计</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">本月采购</p>
                <p className="text-2xl font-bold text-gray-900">{procurementStats.thisMonth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">总金额</p>
                <p className="text-2xl font-bold text-gray-900">¥{procurementStats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">销售统计</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">本月销售</p>
                <p className="text-2xl font-bold text-gray-900">{salesStats.thisMonth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">总金额</p>
                <p className="text-2xl font-bold text-gray-900">¥{salesStats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
