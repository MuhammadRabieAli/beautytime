
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  orderDate: string;
  status: OrderStatus;
};

export const orders: Order[] = [
  {
    id: "o1",
    productId: "p1",
    productName: "Elysian Rose",
    productPrice: 185,
    quantity: 1,
    customerName: "Emma Thompson",
    customerEmail: "emma.t@example.com",
    customerPhone: "+1 (555) 123-4567",
    shippingAddress: "123 Park Avenue, New York, NY 10022",
    orderDate: "2025-05-10T14:30:00",
    status: "processing"
  },
  {
    id: "o2",
    productId: "p5",
    productName: "Oud Royale",
    productPrice: 295,
    quantity: 1,
    customerName: "Alexander Chen",
    customerEmail: "alex.chen@example.com",
    customerPhone: "+1 (555) 987-6543",
    shippingAddress: "456 Rodeo Drive, Beverly Hills, CA 90210",
    orderDate: "2025-05-09T10:15:00",
    status: "shipped"
  },
  {
    id: "o3",
    productId: "p2",
    productName: "Amber Noir",
    productPrice: 210,
    quantity: 2,
    customerName: "Sophia Martinez",
    customerEmail: "sophia.m@example.com",
    customerPhone: "+1 (555) 456-7890",
    shippingAddress: "789 Michigan Avenue, Chicago, IL 60611",
    orderDate: "2025-05-08T16:45:00",
    status: "pending"
  },
  {
    id: "o4",
    productId: "p3",
    productName: "Velvet Orchid",
    productPrice: 165,
    quantity: 1,
    customerName: "James Wilson",
    customerEmail: "j.wilson@example.com",
    customerPhone: "+1 (555) 321-7654",
    shippingAddress: "1010 Peachtree St NE, Atlanta, GA 30309",
    orderDate: "2025-05-07T09:20:00",
    status: "delivered"
  }
];
