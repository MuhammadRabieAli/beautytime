import React from "react";
import { Link } from "react-router-dom";
import { PerfumeBottlePlaceholder } from "../assets/placeholder";

// Updated interface for backend Product model
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="product-card h-full flex flex-col">
        <div className="h-80 relative overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                // If image fails to load, use placeholder
                const target = e.target as HTMLElement;
                if (target.parentElement) {
                  target.parentElement.innerHTML = '';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-full h-full';
                  target.parentElement.appendChild(placeholder);
                  // Render placeholder component
                  const placeholderElement = document.createElement('div');
                  placeholderElement.className = 'w-full h-full';
                  target.parentElement.appendChild(placeholderElement);
                  // In a real app, you would render the React component here
                  // For now, we'll create a simpler placeholder
                  const placeholder2 = document.createElement('div');
                  placeholder2.className = 'w-full h-full bg-gray-100 flex items-center justify-center';
                  placeholder2.innerHTML = '<span className="text-gray-500">BeautyTime</span>';
                  target.parentElement.appendChild(placeholder2);
                }
              }}
            />
          ) : (
            <PerfumeBottlePlaceholder className="w-full h-full" />
          )}
          {!product.inStock && (
            <div className="absolute top-0 right-0 bg-charcoal text-white px-3 py-1 text-xs uppercase tracking-wider">
              Sold Out
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-serif text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.shortDescription}</p>
          <div className="mt-auto">
            <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
