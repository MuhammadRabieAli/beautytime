const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts
} = require('../controllers/product.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', authenticateAdmin, upload.single('image'), createProduct);
router.put('/:id', authenticateAdmin, upload.single('image'), updateProduct);
router.delete('/:id', authenticateAdmin, deleteProduct);

module.exports = router; 