import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import api from "../lib/api";

const FeaturedProducts: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.products.getFeatured();
        const products = response.data;
        
        // Get the first featured product
        if (products && products.length > 0) {
          setFeaturedProduct(products[0]);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-cream">
        <div className="luxury-container text-center">
          <p>Loading featured products...</p>
        </div>
      </section>
    );
  }

  if (!featuredProduct) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Signature Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most coveted fragrance, crafted to evoke emotion and create an unforgettable impression.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-none shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="h-[400px] md:h-[500px] relative overflow-hidden">
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-serif text-3xl mb-4">{featuredProduct.name}</h3>
                <p className="text-gray-600 mb-3 italic">{featuredProduct.shortDescription}</p>
                <p className="text-gray-700 mb-6">
                  {featuredProduct.description.split('.')[0] + '.'}
                </p>
                <p className="text-2xl font-medium mb-8">${featuredProduct.price.toFixed(2)}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/product/${featuredProduct._id}`} className="btn-primary text-center">
                    View Details
                  </Link>
                  <button className="btn-secondary">
                    Add to Cart
                  </button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link to="/products" className="btn-secondary">
            Explore Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
