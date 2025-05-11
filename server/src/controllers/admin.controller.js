const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');

// Create JWT token for admin
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'beauty-time-super-secret-key-change-in-production', 
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Register an admin
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists with this email or username' 
      });
    }
    
    // Create new admin
    const admin = new Admin({
      username,
      email,
      password,
      name
    });
    
    await admin.save();
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.status(201).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to register admin', 
      error: error.message 
    });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Login attempt: email="${email}", password="${password}"`);
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log(`Admin not found with email: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log(`Admin found: ${admin.email}`);
    
    // Check if password is correct
    const isPasswordCorrect = await admin.comparePassword(password);
    
    console.log(`Password check result: ${isPasswordCorrect}`);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.status(200).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error('Error getting admin profile:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Update admin profile
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    
    // Find admin and update
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, email, username },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile
}; 