const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getRecentOrders
} = require('../controllers/order.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');

// Public routes
router.post('/', createOrder); // Anyone can create an order

// Protected routes (admin only)
router.get('/', authenticateAdmin, getAllOrders);
router.get('/recent', authenticateAdmin, getRecentOrders);
router.get('/:id', authenticateAdmin, getOrderById);
router.put('/:id/status', authenticateAdmin, updateOrderStatus);

module.exports = router; 