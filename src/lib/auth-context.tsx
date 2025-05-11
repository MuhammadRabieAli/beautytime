import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';
import { toast } from 'sonner';

type Admin = {
  id: string;
  name: string;
  email: string;
  username: string;
};

type AuthContextType = {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('beauty_admin_token');
    
    if (token) {
      setLoading(true);
      api.auth.getProfile()
        .then(response => {
          setAdmin(response.data);
        })
        .catch(() => {
          localStorage.removeItem('beauty_admin_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.auth.login(email, password);
      setAdmin(response.data);
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    api.auth.logout();
    setAdmin(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 