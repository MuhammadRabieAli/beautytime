const Product = require('../models/product.model');
const Order = require('../models/order.model');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get product stats
    const totalProducts = await Product.countDocuments();
    const inStockProducts = await Product.countDocuments({ inStock: true });
    
    // Get order stats
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    
    // Calculate total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);
    
    // Return all stats
    res.status(200).json({
      success: true,
      data: {
        products: {
          total: totalProducts,
          inStock: inStockProducts
        },
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          processing: processingOrders
        },
        revenue: {
          total: totalRevenue
        }
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get recent orders for dashboard
const getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const recentOrders = await Order.find()
      .sort({ orderDate: -1 })
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: recentOrders.length,
      data: recentOrders
    });
  } catch (error) {
    console.error('Error getting recent orders:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get sales data by status
const getSalesByStatus = async (req, res) => {
  try {
    const salesByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          total: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: salesByStatus
    });
  } catch (error) {
    console.error('Error getting sales by status:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get low stock products
const getLowStockProducts = async (req, res) => {
  try {
    // For this demo, we'll just get products that are out of stock
    // In a real application, you'd track inventory count and return products below a threshold
    const lowStockProducts = await Product.find({ inStock: false })
      .sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: lowStockProducts.length,
      data: lowStockProducts
    });
  } catch (error) {
    console.error('Error getting low stock products:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getSalesByStatus,
  getLowStockProducts
}; 