import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";
import { Edit, Trash, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import api from "../../lib/api";

// Define Product type to match backend
type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
};

const Products: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.products.getAll();
      console.log("Fetched products:", response.data);
      // Log each product's image URL for debugging
      response.data.forEach((product: Product) => {
        console.log(`Product ${product.name} image URL: ${product.image}`);
      });
      setProductsList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      
      // Check if it's a connection error
      if (error instanceof Error && 
          (error.message.includes('Cannot connect to API server') || 
           error.message.includes('API server is unavailable'))) {
        toast.error("Cannot connect to the server. Make sure the server is running on port 5000.");
      } else {
        toast.error("Failed to load products: " + (error instanceof Error ? error.message : 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load products on initial render
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setCurrentProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.products.delete(id);
        setProductsList(productsList.filter(p => p._id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleFormSubmit = async (productData: FormData) => {
    try {
      if (currentProduct) {
        // Update existing product
        const response = await api.products.update(currentProduct._id, productData);
        const updatedProduct = response.data;
        
        setProductsList(productsList.map(p => 
          p._id === currentProduct._id ? updatedProduct : p
        ));
        
        toast.success("Product updated successfully");
      } else {
        // Add new product
        const response = await api.products.create(productData);
        const newProduct = response.data;
        
        setProductsList([...productsList, newProduct]);
        toast.success("Product added successfully");
      }
      
      setShowForm(false);
      // Refresh the product list to ensure we have the latest data
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif">Products</h1>
          <div className="flex space-x-2">
            <button 
              onClick={fetchProducts} 
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
              title="Refresh products"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button 
              onClick={handleAddNew} 
              className="flex items-center px-4 py-2 bg-gold text-white rounded-sm hover:bg-gold-dark"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </button>
          </div>
        </div>
        
        {showForm ? (
          <ProductForm 
            product={currentProduct} 
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)} 
          />
        ) : (
          <div className="admin-card overflow-x-auto">
            {loading ? (
              <div className="py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
                <p className="mt-2 text-sm text-gray-600">Loading products...</p>
              </div>
            ) : productsList.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productsList.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-12 bg-gray-100 rounded">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 object-cover rounded"
                              onError={(e) => {
                                // Log the error for debugging
                                console.error(`Failed to load image for ${product.name}: ${product.image}`);
                                
                                // If image fails to load, replace with placeholder
                                const target = e.target as HTMLElement;
                                if (target.parentElement) {
                                  target.parentElement.innerHTML = '';
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'h-12 w-12';
                                  target.parentElement.appendChild(placeholder);
                                  // Render placeholder component (simplified version)
                                  const placeholderElement = document.createElement('div');
                                  placeholderElement.className = 'h-12 w-12 bg-gray-200 flex items-center justify-center';
                                  placeholderElement.innerHTML = 'BT';
                                  target.parentElement.appendChild(placeholderElement);
                                }
                              }}
                            />
                          ) : (
                            <div className="h-12 w-12 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                              BT
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.featured ? (
                          <span className="text-gold">✓</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleEdit(product)} 
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product._id)} 
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
