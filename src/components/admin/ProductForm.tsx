import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";

// Updated to work with backend model
interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: FormData) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      price: 0,
      description: "",
      shortDescription: "",
      image: "",
      category: "floral",
      featured: false,
      inStock: true
    }
  );
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? parseFloat(value as string) || 0 : value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object for file upload
    const formDataToSubmit = new FormData();
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'image') { // Skip image as we'll handle it separately
        formDataToSubmit.append(key, value.toString());
      }
    });
    
    // Add the file if selected
    if (selectedFile) {
      formDataToSubmit.append('image', selectedFile);
      console.log('File selected:', selectedFile.name, selectedFile.type, selectedFile.size);
    } else if (formData.image) {
      // If no new file is selected but there's an existing image URL, pass it along
      // Backend will know not to change the image if no file is uploaded
      formDataToSubmit.append('imageUrl', formData.image);
      console.log('Using existing image URL:', formData.image);
    }
    
    // Log the FormData contents for debugging
    console.log('Form data entries:');
    for (let pair of formDataToSubmit.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    // Add debug information for form data
    console.log('Product being submitted:');
    console.log('Has new file upload:', !!selectedFile);
    console.log('Current form data:', formData);
    
    onSubmit(formDataToSubmit);
  };

  return (
    <div className="admin-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
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
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input-luxury"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-luxury"
                required
              >
                <option value="floral">Floral</option>
                <option value="oriental">Oriental</option>
                <option value="woody">Woody</option>
                <option value="fresh">Fresh</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="input-luxury"
              maxLength={50}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Brief product description (max 50 characters)
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-luxury min-h-[100px]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  type="file"
                  id="image-file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                
                <div 
                  onClick={handleClickUpload}
                  className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (max 5MB)</p>
                </div>
                
                {product && product.image && !selectedFile && (
                  <p className="text-xs text-gray-500 mt-2">
                    Current image will be used if no new image is uploaded
                  </p>
                )}
              </div>
              
              <div>
                {previewImage ? (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-40 w-40 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="h-40 w-40 bg-gray-100 flex items-center justify-center rounded-md border">
                    <p className="text-xs text-gray-500">No image preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm text-gray-700"
              >
                Featured Product
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
              />
              <label
                htmlFor="inStock"
                className="ml-2 block text-sm text-gray-700"
              >
                In Stock
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gold text-white rounded-sm hover:bg-gold-dark"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
