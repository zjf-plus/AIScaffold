import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, useActionData, useNavigation, Form } from "react-router";
import { AssetService } from "~/lib/services/AssetService";
import type { AssetCreateInput } from "~/lib/types/Asset";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const status = url.searchParams.get("status");
  const department = url.searchParams.get("department");
  const assigned_to = url.searchParams.get("assigned_to");

  const assetService = new AssetService();
  
  try {
    let assets;
    if (search) {
      assets = await assetService.searchAssets(search);
    } else if (status) {
      assets = await assetService.getAssetsByStatus(status);
    } else if (department) {
      assets = await assetService.getAssetsByDepartment(department);
    } else if (assigned_to) {
      assets = await assetService.getAssetsByAssignedTo(assigned_to);
    } else {
      assets = await assetService.getAllAssets();
    }

    const stats = await assetService.getAssetStats();
    
    return { assets, stats };
  } catch (error) {
    console.error("Error loading assets:", error);
    return { error: "Failed to load assets" };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  const assetService = new AssetService();

  try {
    switch (intent) {
      case "create": {
        const assetData: AssetCreateInput = {
          assetName: formData.get("asset_name") as string,
          category: formData.get("category") as string,
          brand: formData.get("brand") as string,
          model: formData.get("model") as string,
          serialNumber: formData.get("serial_number") as string,
          purchaseDate: new Date(formData.get("purchase_date") as string),
          purchasePrice: parseFloat(formData.get("purchase_price") as string),
          location: formData.get("location") as string,
          department: formData.get("department") as string,
          assignedTo: formData.get("assigned_to") as string || undefined,
          description: formData.get("description") as string || undefined,
          warrantyExpiry: formData.get("warranty_expiry") ? new Date(formData.get("warranty_expiry") as string) : undefined,
        };

        const asset = await assetService.createAsset(assetData);
        return { success: true, asset };
      }

      case "update": {
        const id = formData.get("id") as string;
        const updateData = {
          assetName: formData.get("asset_name") as string,
          category: formData.get("category") as string,
          brand: formData.get("brand") as string,
          model: formData.get("model") as string,
          serialNumber: formData.get("serial_number") as string,
          currentValue: parseFloat(formData.get("current_value") as string),
          location: formData.get("location") as string,
          department: formData.get("department") as string,
          assignedTo: formData.get("assigned_to") as string || undefined,
          status: formData.get("status") as "active" | "maintenance" | "retired" | "disposed",
          description: formData.get("description") as string || undefined,
        };

        const asset = await assetService.updateAsset(id, updateData);
        return { success: true, asset };
      }

      case "delete": {
        const id = formData.get("id") as string;
        await assetService.deleteAsset(id);
        return { success: true };
      }

      case "updateStatus": {
        const id = formData.get("id") as string;
        const status = formData.get("status") as "active" | "maintenance" | "retired" | "disposed";
        const asset = await assetService.updateAssetStatus(id, status);
        return { success: true, asset };
      }

      case "assign": {
        const id = formData.get("id") as string;
        const assigned_to = formData.get("assigned_to") as string;
        const asset = await assetService.assignAsset(id, assigned_to);
        return { success: true, asset };
      }

      case "unassign": {
        const id = formData.get("id") as string;
        const asset = await assetService.unassignAsset(id);
        return { success: true, asset };
      }

      default:
        return { error: "Invalid action" };
    }
    } catch (error) {
      console.error("Error in asset action:", error);
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export default function AssetsIndex() {
  const data = useLoaderData<typeof loader>();
  const assets = data?.assets || [];
  const stats = data?.stats || { total: 0, active: 0, maintenance: 0, retired: 0, disposed: 0 };
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">资产管理</h1>
        <p className="text-gray-600">管理和跟踪公司资产</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">总资产</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">使用中</h3>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">维护中</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">已报废</h3>
          <p className="text-2xl font-bold text-red-600">{stats.retired + stats.disposed}</p>
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <Form method="get" className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            placeholder="搜索资产..."
            className="flex-1 min-w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有状态</option>
            <option value="active">使用中</option>
            <option value="maintenance">维护中</option>
            <option value="retired">已退役</option>
            <option value="disposed">已处置</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            搜索
          </button>
        </Form>
      </div>

      {/* 资产列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">资产列表</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  资产代码
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  资产名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类别
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  部门
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  当前价值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset: any) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.asset_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.asset_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      asset.status === 'active' ? 'bg-green-100 text-green-800' :
                      asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      asset.status === 'retired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {asset.status === 'active' ? '使用中' :
                       asset.status === 'maintenance' ? '维护中' :
                       asset.status === 'retired' ? '已退役' : '已处置'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ¥{asset.current_value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        编辑
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 操作结果提示 */}
      {actionData?.success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          操作成功！
        </div>
      )}
      {actionData?.error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {actionData.error}
        </div>
      )}
    </div>
  );
}
