const Product = require('../models/product.model');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, featured, inStock, sort, limit = 10, page = 1 } = req.query;
    
    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (inStock) filter.inStock = inStock === 'true';
    
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
      sortOption = { createdAt: -1 };
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find products with filters, sorting, and pagination
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Fix image URLs that are using relative paths
    for (let i = 0; i < products.length; i++) {
      if (products[i].image && products[i].image.startsWith('/uploads/')) {
        // This is a relative path, update it to an absolute URL
        const baseUrl = process.env.NODE_ENV === 'production'
          ? 'https://beautytime.onrender.com'
          : 'http://localhost:5000';
        const absoluteUrl = `${baseUrl}${products[i].image}`;
        console.log(`Converting relative image path to absolute: ${products[i].image} -> ${absoluteUrl}`);
        products[i].image = absoluteUrl;
        
        // Update in the database for future requests
        await Product.updateOne({ _id: products[i]._id }, { image: absoluteUrl });
      }
    }
    
    // Debug log for image URLs
    console.log("Products being sent to client:");
    products.forEach(product => {
      console.log(`Product ${product.name}, ID: ${product._id}, Image URL: ${product.image}`);
    });
    
    // Count total matching documents for pagination
    const total = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: products
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error getting product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    console.log('Create product request body:', req.body);
    console.log('Create product file:', req.file);
    
    // Handle file upload
    if (req.file) {
      // Set the image URL to the uploaded file path
      // Use absolute URL to ensure the image is accessible
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://beautytime.onrender.com'
        : 'http://localhost:5000';
      req.body.image = `${baseUrl}/uploads/${req.file.filename}`;
      console.log('New image path:', req.body.image);
    }
    
    const newProduct = new Product(req.body);
    await newProduct.save();
    
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to create product', 
      error: error.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    console.log('Update product request body:', req.body);
    console.log('Update product file:', req.file);
    
    // Prepare update data
    const updateData = { ...req.body, updatedAt: Date.now() };
    
    // Handle file upload
    if (req.file) {
      // Set the image URL to the uploaded file path
      // Use absolute URL to ensure the image is accessible
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://beautytime.onrender.com'
        : 'http://localhost:5000';
      updateData.image = `${baseUrl}/uploads/${req.file.filename}`;
      console.log('New image path:', updateData.image);
    } else if (req.body.imageUrl) {
      // If no new file but imageUrl is provided, use that
      updateData.image = req.body.imageUrl;
      // Remove the temporary imageUrl field
      delete updateData.imageUrl;
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const featuredProducts = await Product.find({ featured: true, inStock: true })
      .limit(limit)
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: featuredProducts.length, data: featuredProducts });
  } catch (error) {
    console.error('Error getting featured products:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
}; 