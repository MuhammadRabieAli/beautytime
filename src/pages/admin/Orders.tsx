import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";
import { toast } from "sonner";

// Define order types based on backend model
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  _id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
}

const Orders: React.FC = () => {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.orders.getAll();
      setOrdersList(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Load orders on initial render
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      
      // Update local state
      const updatedOrders = ordersList.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrdersList(updatedOrders);
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = statusFilter === "all" 
    ? ordersList 
    : ordersList.filter(order => order.status === statusFilter);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-serif mb-6">Orders</h1>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "all" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "pending" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("processing")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "processing" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              Processing
            </button>
            <button
              onClick={() => setStatusFilter("shipped")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "shipped" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              Shipped
            </button>
            <button
              onClick={() => setStatusFilter("delivered")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "delivered" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              Delivered
            </button>
            <button
              onClick={() => setStatusFilter("cancelled")}
              className={`px-4 py-2 text-sm font-medium rounded-sm 
              ${statusFilter === "cancelled" ? "bg-gold text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              Cancelled
            </button>
          </div>
        </div>
        
        <div className="admin-card overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
              <p className="mt-2 text-sm text-gray-600">Loading orders...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.productName}</div>
                      <div className="text-xs text-gray-500">
                        Qty: {order.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(order.totalAmount || (order.productPrice * order.quantity)).toFixed(2)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value as OrderStatus)}
                        className="text-sm border border-gray-300 rounded-sm px-2 py-1 bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No orders match the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
