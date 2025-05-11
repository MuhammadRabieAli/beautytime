const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const Admin = require('../models/admin.model');
require('dotenv').config();

// Sample product data
const products = [
  {
    name: "Elysian Rose",
    price: 185,
    description: "A luxurious blend of Damascus rose, peony, and warm amber. Elysian Rose captures the essence of a Mediterranean garden at sunset. Notes of bergamot and blackcurrant add a fresh, fruity opening that mellows into a heart of rich florals. The base reveals sandalwood and musk for a lingering, sophisticated finish.",
    shortDescription: "Opulent rose with amber undertones",
    image: "/assets/perfume1.jpg",
    category: "floral",
    featured: true,
    inStock: true
  },
  {
    name: "Amber Noir",
    price: 210,
    description: "An intoxicating oriental fragrance built around precious amber and dark woods. Amber Noir opens with spicy notes of cardamom and saffron, revealing a heart of Turkish rose and jasmine. The base is rich with vanilla, patchouli, and oud, creating a mysterious and sensual experience that lasts throughout the day.",
    shortDescription: "Mysterious amber with spicy undertones",
    image: "/assets/perfume2.jpg",
    category: "oriental",
    featured: true,
    inStock: true
  },
  {
    name: "Velvet Orchid",
    price: 165,
    description: "A seductive composition centered around rare orchid species. The fragrance begins with mandarin and honey, blooming into a heart of black orchid and jasmine. Base notes of suede, vanilla, and sandalwood create a smooth, velvety texture that embodies understated luxury and modern femininity.",
    shortDescription: "Sensual orchid and smooth vanilla",
    image: "/assets/perfume3.jpg",
    category: "floral",
    featured: false,
    inStock: true
  },
  {
    name: "Aqua Sublime",
    price: 155,
    description: "A refreshing marine fragrance that captures the essence of Mediterranean coastlines. Aqua Sublime opens with bright citrus and sea notes, developing into a heart of lavender and rosemary. The dry down reveals cedar and white musk, evoking the feeling of warm sun on coastal rocks.",
    shortDescription: "Refreshing marine with citrus notes",
    image: "/assets/perfume4.jpg",
    category: "fresh",
    featured: false,
    inStock: true
  },
  {
    name: "Oud Royale",
    price: 295,
    description: "A majestic fragrance centered around precious oud wood. This opulent perfume opens with saffron and spices, unfolding into a rich heart of Bulgarian rose and patchouli. The base is dominated by aged oud, amber, and leather, creating a long-lasting, regal impression that embodies true luxury.",
    shortDescription: "Opulent oud with rose and spices",
    image: "/assets/perfume5.jpg",
    category: "woody",
    featured: true,
    inStock: true
  },
  {
    name: "Solar Bloom",
    price: 175,
    description: "A radiant floral fragrance inspired by sun-drenched gardens. Solar Bloom features bright bergamot and mandarin, leading to a luminous heart of orange blossom and jasmine. The base of warm amber and musk creates a golden glow that embodies the feeling of perfect summer days.",
    shortDescription: "Bright florals with citrus and amber",
    image: "/assets/perfume6.jpg",
    category: "floral",
    featured: false,
    inStock: true
  }
];

// Default admin user
const adminUser = {
  username: 'admin',
  email: 'admin@beautystore.com',
  password: 'admin123',
  name: 'Admin User'
};

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beauty-time')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing data
      await Product.deleteMany({});
      await Order.deleteMany({});
      await Admin.deleteMany({});
      
      console.log('Cleared existing data');
      
      // Insert products
      const insertedProducts = await Product.insertMany(products);
      console.log(`Inserted ${insertedProducts.length} products`);

      // Create admin user
      console.log('Creating admin with credentials:');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Password: ${adminUser.password}`);
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);
      
      const admin = new Admin({
        ...adminUser,
        password: hashedPassword
      });
      
      await admin.save();
      console.log('Created admin user');
      
      // Mock Orders (using the inserted product IDs)
      const orderData = [
        {
          productId: insertedProducts[0]._id,
          productName: insertedProducts[0].name,
          productPrice: insertedProducts[0].price,
          quantity: 1,
          customerName: "Emma Thompson",
          customerEmail: "emma.t@example.com",
          customerPhone: "+1 (555) 123-4567",
          shippingAddress: "123 Park Avenue, New York, NY 10022",
          orderDate: new Date(),
          status: "processing",
          totalAmount: insertedProducts[0].price * 1
        },
        {
          productId: insertedProducts[4]._id,
          productName: insertedProducts[4].name,
          productPrice: insertedProducts[4].price,
          quantity: 1,
          customerName: "Alexander Chen",
          customerEmail: "alex.chen@example.com",
          customerPhone: "+1 (555) 987-6543",
          shippingAddress: "456 Rodeo Drive, Beverly Hills, CA 90210",
          orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          status: "shipped",
          totalAmount: insertedProducts[4].price * 1
        },
        {
          productId: insertedProducts[1]._id,
          productName: insertedProducts[1].name,
          productPrice: insertedProducts[1].price,
          quantity: 2,
          customerName: "Sophia Martinez",
          customerEmail: "sophia.m@example.com",
          customerPhone: "+1 (555) 456-7890",
          shippingAddress: "789 Michigan Avenue, Chicago, IL 60611",
          orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          status: "pending",
          totalAmount: insertedProducts[1].price * 2
        },
        {
          productId: insertedProducts[2]._id,
          productName: insertedProducts[2].name,
          productPrice: insertedProducts[2].price,
          quantity: 1,
          customerName: "James Wilson",
          customerEmail: "j.wilson@example.com",
          customerPhone: "+1 (555) 321-7654",
          shippingAddress: "1010 Peachtree St NE, Atlanta, GA 30309",
          orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          status: "delivered",
          totalAmount: insertedProducts[2].price * 1
        }
      ];
      
      const insertedOrders = await Order.insertMany(orderData);
      console.log(`Inserted ${insertedOrders.length} orders`);
      
      console.log('Database seeded successfully!');
      
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 