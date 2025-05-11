import React, { useState } from "react";
import { toast } from "sonner";
import api from "../lib/api";

// Define product interface to match backend model
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
}

interface OrderFormProps {
  product: Product;
}

const OrderForm: React.FC<OrderFormProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create order data
      const orderData = {
        productId: product._id,
        quantity: formData.quantity,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address
      };

      // Submit order to API
      await api.orders.create(orderData);
      
      toast.success("Order placed successfully! We'll contact you soon to confirm payment and delivery details.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        quantity: 1
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-sm p-6">
      <h3 className="font-serif text-xl mb-6">Place Your Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-luxury"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-luxury"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-luxury"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm text-gray-700 mb-1">
              Shipping Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-luxury"
              required
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
              value={formData.quantity}
              onChange={handleChange}
              className="input-luxury w-24"
            />
          </div>
          
          <div className="pt-4">
            <p className="mb-4 font-medium">
              Total: ${(product.price * formData.quantity).toFixed(2)}
            </p>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Place Order"}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              * By placing an order, you agree to our Terms of Service and Privacy Policy. 
              You will be contacted to arrange payment details.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
