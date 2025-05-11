import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import OrderForm from "../components/OrderForm";
import { PerfumeBottlePlaceholder } from "../assets/placeholder";
import api from "../lib/api";

// Define product interface
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await api.products.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // If product not found or error, redirect to products page
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="luxury-container py-12 text-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return null; // Will redirect due to the useEffect
  }
  
  return (
    <Layout>
      <div className="luxury-container py-12">
        <div className="mb-6">
          <Link to="/products" className="text-charcoal hover:text-gold">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="sticky top-8 bg-white p-6 rounded-sm shadow-soft">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover rounded-sm"
                />
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <PerfumeBottlePlaceholder className="w-1/2 h-1/2 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
              <p className="text-2xl font-medium mb-4">${product.price.toFixed(2)}</p>
              <div className="flex items-center mb-6">
                <span className={`px-3 py-1 text-xs font-medium rounded-full 
                  ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.featured && (
                  <span className="ml-2 px-3 py-1 bg-gold text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 italic mb-6">{product.shortDescription}</p>
              <div className="prose max-w-none mb-8">
                <p>{product.description}</p>
              </div>
            </div>
            
            {product.inStock && <OrderForm product={product} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
