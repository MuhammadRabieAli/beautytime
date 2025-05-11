const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentOrders,
  getSalesByStatus,
  getLowStockProducts
} = require('../controllers/dashboard.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');

// All dashboard routes are protected
router.get('/stats', authenticateAdmin, getDashboardStats);
router.get('/recent-orders', authenticateAdmin, getRecentOrders);
router.get('/sales-by-status', authenticateAdmin, getSalesByStatus);
router.get('/low-stock', authenticateAdmin, getLowStockProducts);

module.exports = router; 