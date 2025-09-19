import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, useActionData, useNavigation, Form, Link } from "react-router";
import { AssetService } from "~/lib/services/AssetService";
import type { AssetUpdateInput } from "~/lib/types/Asset";

export async function loader({ params }: LoaderFunctionArgs) {
  const assetService = new AssetService();
  
  try {
    const asset = await assetService.getAssetById(params.id!);
    if (!asset) {
      throw new Response("Asset not found", { status: 404 });
    }
    
    return { asset };
  } catch (error) {
    console.error("Error loading asset:", error);
    throw new Response("Failed to load asset", { status: 500 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const assetService = new AssetService();

  try {
    switch (intent) {
      case "update": {
        const updateData: AssetUpdateInput = {
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

        const asset = await assetService.updateAsset(params.id!, updateData);
        return { success: true, asset };
      }

      case "updateStatus": {
        const status = formData.get("status") as "active" | "maintenance" | "retired" | "disposed";
        const asset = await assetService.updateAssetStatus(params.id!, status);
        return { success: true, asset };
      }

      case "assign": {
        const assigned_to = formData.get("assigned_to") as string;
        const asset = await assetService.assignAsset(params.id!, assigned_to);
        return { success: true, asset };
      }

      case "unassign": {
        const asset = await assetService.unassignAsset(params.id!);
        return { success: true, asset };
      }

      case "updateValue": {
        const current_value = parseFloat(formData.get("current_value") as string);
        const asset = await assetService.updateAssetValue(params.id!, current_value);
        return { success: true, asset };
      }

      case "scheduleMaintenance": {
        const next_maintenance_date = new Date(formData.get("next_maintenance_date") as string);
        const asset = await assetService.scheduleMaintenance(params.id!, next_maintenance_date);
        return { success: true, asset };
      }

      case "completeMaintenance": {
        const asset = await assetService.completeMaintenance(params.id!);
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

export default function AssetDetail() {
  const data = useLoaderData<typeof loader>();
  const asset = data?.asset;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/assets" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← 返回资产列表
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{asset?.assetName}</h1>
        <p className="text-gray-600">资产代码: {asset?.assetCode}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">基本信息</h2>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="intent" value="update" />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">资产名称</label>
                <input
                  type="text"
                  name="asset_name"
                  defaultValue={asset?.assetName}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">类别</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={asset.category}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">品牌</label>
                <input
                  type="text"
                  name="brand"
                  defaultValue={asset.brand}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">型号</label>
                <input
                  type="text"
                  name="model"
                  defaultValue={asset.model}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">序列号</label>
              <input
                type="text"
                name="serial_number"
                  defaultValue={asset?.serialNumber}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">位置</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={asset.location}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">部门</label>
                <input
                  type="text"
                  name="department"
                  defaultValue={asset.department}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">描述</label>
              <textarea
                name="description"
                defaultValue={asset.description || ""}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "保存中..." : "保存更改"}
            </button>
          </Form>
        </div>

        {/* 状态和价值管理 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">状态和价值</h2>
          
          {/* 状态更新 */}
          <Form method="post" className="mb-6">
            <input type="hidden" name="intent" value="updateStatus" />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">当前状态</label>
              <div className="flex space-x-2">
                <select
                  name="status"
                  defaultValue={asset.status}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">使用中</option>
                  <option value="maintenance">维护中</option>
                  <option value="retired">已退役</option>
                  <option value="disposed">已处置</option>
                </select>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  更新
                </button>
              </div>
            </div>
          </Form>

          {/* 价值更新 */}
          <Form method="post" className="mb-6">
            <input type="hidden" name="intent" value="updateValue" />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">当前价值</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="current_value"
                  defaultValue={asset?.currentValue}
                  step="0.01"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  更新
                </button>
              </div>
            </div>
          </Form>

          {/* 分配管理 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">分配管理</h3>
            {asset?.assignedTo ? (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-600">分配给: {asset.assignedTo}</span>
                <Form method="post" className="inline">
                  <input type="hidden" name="intent" value="unassign" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    取消分配
                  </button>
                </Form>
              </div>
            ) : (
              <Form method="post" className="flex space-x-2">
                <input type="hidden" name="intent" value="assign" />
                <input
                  type="text"
                  name="assigned_to"
                  placeholder="输入用户名"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  分配
                </button>
              </Form>
            )}
          </div>

          {/* 维护管理 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">维护管理</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>上次维护: {asset?.lastMaintenanceDate ? new Date(asset.lastMaintenanceDate).toLocaleDateString() : "无"}</p>
              <p>下次维护: {asset?.nextMaintenanceDate ? new Date(asset.nextMaintenanceDate).toLocaleDateString() : "无"}</p>
            </div>
            
            <Form method="post" className="mt-4">
              <input type="hidden" name="intent" value="scheduleMaintenance" />
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="next_maintenance_date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                >
                  安排维护
                </button>
              </div>
            </Form>

            {asset.status === 'maintenance' && (
              <Form method="post" className="mt-2">
                <input type="hidden" name="intent" value="completeMaintenance" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  完成维护
                </button>
              </Form>
            )}
          </div>
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
