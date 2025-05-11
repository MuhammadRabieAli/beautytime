import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";

const AdminHeader: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, admin, logout } = useAuth();
  
  // Only show the header on admin pages or login page
  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname === "/login";
  
  if (!isAdminPage) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link to="/admin/dashboard" className="text-xl font-serif text-gold">
              Beauty Time Admin
            </Link>
          </div>
          
          {isAuthenticated && (
            <nav className="flex space-x-6 items-center">
              <Link 
                to="/admin/dashboard" 
                className={`text-sm ${location.pathname === "/admin/dashboard" ? "text-gold font-medium" : "text-gray-500 hover:text-gold"}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/products" 
                className={`text-sm ${location.pathname === "/admin/products" ? "text-gold font-medium" : "text-gray-500 hover:text-gold"}`}
              >
                Products
              </Link>
              <Link 
                to="/admin/orders" 
                className={`text-sm ${location.pathname === "/admin/orders" ? "text-gold font-medium" : "text-gray-500 hover:text-gold"}`}
              >
                Orders
              </Link>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  {admin?.name || "Admin"}
                </span>
                <button 
                  onClick={logout}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
