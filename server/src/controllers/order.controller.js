const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const { status, sort, limit = 10, page = 1 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    
    // Build sort object
    let sortOption = {};
    if (sort) {
      const sortFields = sort.split(',');
      sortFields.forEach(field => {
        if (field.startsWith('-')) {
          sortOption[field.substring(1)] = -1;
        } else {
          sortOption[field] = 1;
        }
      });
    } else {
      sortOption = { orderDate: -1 }; // Default sort by newest
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find orders with filters, sorting, and pagination
    const orders = await Order.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Count total matching documents for pagination
    const total = await Order.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: orders
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error getting order:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { productId, quantity, customerName, customerEmail, customerPhone, shippingAddress } = req.body;
    
    // Check if product exists and is in stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    if (!product.inStock) {
      return res.status(400).json({ success: false, message: 'Product is out of stock' });
    }
    
    // Calculate total amount
    const totalAmount = product.price * quantity;
    
    // Create new order
    const newOrder = new Order({
      productId,
      productName: product.name,
      productPrice: product.price,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      totalAmount,
      status: 'pending'
    });
    
    await newOrder.save();
    
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to create order', 
      error: error.message 
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value. Status must be one of: pending, processing, shipped, delivered, cancelled' 
      });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get recent orders
const getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const recentOrders = await Order.find()
      .sort({ orderDate: -1 })
      .limit(limit);
    
    res.status(200).json({ success: true, count: recentOrders.length, data: recentOrders });
  } catch (error) {
    console.error('Error getting recent orders:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getRecentOrders
}; 