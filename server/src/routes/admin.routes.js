const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');
const Admin = require('../models/admin.model');

// Public routes
router.post('/register', registerAdmin); // This could be protected in production
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', authenticateAdmin, getAdminProfile);
router.put('/profile', authenticateAdmin, updateAdminProfile);

// Temporary endpoint to create admin - REMOVE THIS IN PRODUCTION
router.get('/create-test-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@beautystore.com' });
    
    if (existingAdmin) {
      return res.status(200).json({ 
        success: true, 
        message: 'Admin already exists',
        admin: {
          email: existingAdmin.email,
          username: existingAdmin.username,
          id: existingAdmin._id
        }
      });
    }
    
    // Create new admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@beautystore.com',
      password: 'admin123',
      name: 'Admin User'
    });
    
    await admin.save();
    
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        email: admin.email,
        username: admin.username,
        id: admin._id
      }
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create admin', 
      error: error.message 
    });
  }
});

module.exports = router; 