# Beauty Time E-commerce Platform

A complete e-commerce solution for beauty products with both customer-facing storefront and admin dashboard.

## Project Overview

This project is a full-stack e-commerce application with:

- **Customer Storefront**: Browse products, view details, and place orders
- **Admin Dashboard**: Manage products, track orders, view sales statistics
- **RESTful API**: Provides data for both frontend and backend operations

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- React Router for navigation
- React Query for data fetching
- shadcn-ui components
- TailwindCSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for admin authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Installation and Setup

1. Clone the repository:
```
git clone <repository-url>
cd beauty-time-aether-store
```

2. Install dependencies for frontend and backend:
```
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/beauty-time
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   ```

4. Seed the database with initial data:
```
cd server
npm run seed
```

5. Start the development servers:
```
# Start backend server (from server directory)
npm run dev

# Start frontend (from root directory)
npm run dev
```

## Features

### Customer Features
- Browse products by category
- View product details
- Place orders without registration
- Clean, responsive UI

### Admin Features
- Secure login system
- Dashboard with sales statistics
- Manage product inventory (add, edit, delete)
- Order management with status updates
- No customer accounts required

## Default Admin Login
- Email: admin@beautystore.com
- Password: admin123

## API Endpoints

The backend provides the following API endpoints:

### Products
- GET /api/products - Get all products
- GET /api/products/featured - Get featured products
- GET /api/products/:id - Get product by ID
- POST /api/products - Add new product (admin)
- PUT /api/products/:id - Update product (admin)
- DELETE /api/products/:id - Delete product (admin)

### Orders
- POST /api/orders - Create a new order (public)
- GET /api/orders - Get all orders (admin)
- GET /api/orders/:id - Get order by ID (admin)
- PUT /api/orders/:id/status - Update order status (admin)

### Admin Authentication
- POST /api/admin/login - Admin login
- GET /api/admin/profile - Get admin profile

### Dashboard
- GET /api/dashboard/stats - Get dashboard statistics
- GET /api/dashboard/recent-orders - Get recent orders

## Deployment

The application can be deployed using platforms like Vercel, Netlify, or Heroku. See original README for deployment instructions.
