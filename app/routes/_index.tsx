import { Link } from "react-router";

export default function Index() {
  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎使用资产管理系统
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          高效管理您的企业资产、采购和销售流程
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            to="/dashboard"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">仪表板</h3>
            <p className="text-gray-600">查看系统概览和关键指标</p>
          </Link>
          
          <Link
            to="/assets"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">资产管理</h3>
            <p className="text-gray-600">管理公司资产和库存</p>
          </Link>
          
          <Link
            to="/procurement"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">采购管理</h3>
            <p className="text-gray-600">处理采购订单和供应商</p>
          </Link>
          
          <Link
            to="/sales"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">销售管理</h3>
            <p className="text-gray-600">管理销售订单和客户</p>
          </Link>
          
          <Link
            to="/suppliers"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">供应商管理</h3>
            <p className="text-gray-600">管理供应商信息</p>
          </Link>
          
          <Link
            to="/customers"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">客户管理</h3>
            <p className="text-gray-600">管理客户信息</p>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            开始使用
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
