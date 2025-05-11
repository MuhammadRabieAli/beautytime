const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// Middleware to authenticate admin using JWT
const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'beauty-time-super-secret-key-change-in-production');
    
    // Find admin by id
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }
    
    // Set admin on request object
    req.admin = admin;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = {
  authenticateAdmin
}; 