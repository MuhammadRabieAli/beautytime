import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";
import { toast } from "sonner";

// Define types for dashboard stats
interface DashboardStats {
  products: {
    total: number;
    inStock: number;
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
  };
  revenue: {
    total: number;
  };
}

// Define type for recent orders
interface RecentOrder {
  _id: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: string;
  totalAmount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: { total: 0, inStock: 0 },
    orders: { total: 0, pending: 0, processing: 0 },
    revenue: { total: 0 }
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard stats
        const statsResponse = await api.dashboard.getStats();
        setStats(statsResponse.data);

        // Fetch recent orders
        const ordersResponse = await api.dashboard.getRecentOrders();
        setRecentOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-serif mb-6">Dashboard</h1>
        
        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
            <p className="mt-2 text-sm text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card - Total Products */}
              <div className="admin-card bg-white rounded-lg shadow-soft">
                <h2 className="text-lg font-medium mb-1">Total Products</h2>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-serif">{stats.products.total}</span>
                  <span className="text-sm text-gray-500">{stats.products.inStock} in stock</span>
                </div>
              </div>
              
              {/* Card - Total Orders */}
              <div className="admin-card bg-white rounded-lg shadow-soft">
                <h2 className="text-lg font-medium mb-1">Total Orders</h2>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-serif">{stats.orders.total}</span>
                  <span className="text-sm text-gray-500">{stats.orders.pending} pending</span>
                </div>
              </div>
              
              {/* Card - Processing Orders */}
              <div className="admin-card bg-white rounded-lg shadow-soft">
                <h2 className="text-lg font-medium mb-1">Processing</h2>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-serif">{stats.orders.processing}</span>
                  <span className="text-sm text-gray-500">orders</span>
                </div>
              </div>
              
              {/* Card - Total Revenue */}
              <div className="admin-card bg-white rounded-lg shadow-soft">
                <h2 className="text-lg font-medium mb-1">Total Revenue</h2>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-serif">${stats.revenue.total.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">all time</span>
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-serif">Recent Orders</h2>
                <Link to="/admin/orders" className="text-gold hover:underline text-sm">
                  View All
                </Link>
              </div>
              
              <div className="admin-card overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-xs text-gray-500">{order.customerEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                order.status === 'pending' ? 'bg-gray-100 text-gray-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No recent orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/admin/products" className="block">
                <div className="admin-card hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-serif mb-2">Manage Products</h3>
                  <p className="text-gray-500 text-sm mb-4">Add, edit, or remove products from your inventory</p>
                  <div className="text-gold text-sm">View Products →</div>
                </div>
              </Link>
              
              <Link to="/admin/orders" className="block">
                <div className="admin-card hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-serif mb-2">View Orders</h3>
                  <p className="text-gray-500 text-sm mb-4">Review and manage customer orders</p>
                  <div className="text-gold text-sm">View Orders →</div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
