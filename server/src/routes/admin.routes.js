const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');

// Public routes
router.post('/register', registerAdmin); // This could be protected in production
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', authenticateAdmin, getAdminProfile);
router.put('/profile', authenticateAdmin, updateAdminProfile);

module.exports = router; 