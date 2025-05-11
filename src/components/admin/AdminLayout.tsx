
import React from "react";
import AdminHeader from "./AdminHeader";
import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/login";
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLoginPage && <AdminHeader />}
      <main className="flex-grow py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
