# Beauty Time Backend API

This is the backend API for the Beauty Time e-commerce store. It provides endpoints for products, orders, admin authentication, and dashboard statistics.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication for admin users
- Product management (CRUD operations)
- Order management
- Dashboard statistics
- Data validation and error handling

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or cloud)

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
npm install
```

4. Create a .env file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/beauty-time
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

5. Seed the database:

```bash
node src/config/seed.js
```

6. Start the server:

```bash
npm run dev
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Orders

- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/recent` - Get recent orders (admin only)
- `GET /api/orders/:id` - Get an order by ID (admin only)
- `POST /api/orders` - Create a new order (public)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Admin

- `POST /api/admin/register` - Register a new admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (admin only)
- `PUT /api/admin/profile` - Update admin profile (admin only)

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics (admin only)
- `GET /api/dashboard/recent-orders` - Get recent orders (admin only)
- `GET /api/dashboard/sales-by-status` - Get sales by status (admin only)
- `GET /api/dashboard/low-stock` - Get low stock products (admin only)

## Authentication

The API uses JWT for authentication. Admin-only endpoints require a valid token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Development

### Default Admin

After running the seed script, you can log in with the following credentials:

- Email: admin@beautystore.com
- Password: admin123

### Running Tests

```bash
npm test
``` 