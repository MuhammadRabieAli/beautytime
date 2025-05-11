// API Service for Beauty Time

// Base API URL
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://beautytime.onrender.com/api'  // Production API on Render
  : 'http://localhost:5000/api';           // Local development

// Helper for local storage
const getToken = () => localStorage.getItem('beauty_admin_token');
const setToken = (token: string) => localStorage.setItem('beauty_admin_token', token);
const removeToken = () => localStorage.removeItem('beauty_admin_token');

// Flag to track API availability
let isApiAvailable = true;

// Basic fetch wrapper with auth
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  // If we already know the API is unavailable, fail fast
  if (!isApiAvailable && endpoint !== '/admin/login') {
    console.warn(`API is unavailable, endpoint: ${endpoint}`);
    throw new Error('API server is unavailable. Please make sure the server is running on port 5000.');
  }

  const token = getToken();
  
  // Don't set content-type for FormData (browser will set it with boundary)
  const isFormData = options.body instanceof FormData;
  
  const headers: Record<string, string> = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string> || {})
  };
  
  // Log the request for debugging
  console.log(`API Request: ${options.method || 'GET'} ${endpoint}`);
  console.log('Headers:', headers);
  if (options.body) {
    if (isFormData) {
      console.log('Body: [FormData]');
    } else {
      console.log('Body:', options.body);
    }
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // If we reach here, API is available
    isApiAvailable = true;
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    }
    
    const responseData = await response.json();
    console.log('API Response:', responseData);
    return responseData;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('API Connection Error - Server might be down:', error);
      isApiAvailable = false;
      throw new Error('Cannot connect to API server. Please make sure the server is running on port 5000.');
    }
    throw error;
  }
};

// API endpoints
export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string) => {
      const data = await fetchWithAuth('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (data.token) {
        setToken(data.token);
      }
      
      return data;
    },
    logout: () => {
      removeToken();
    },
    getProfile: async () => {
      return await fetchWithAuth('/admin/profile');
    }
  },
  
  // Products
  products: {
    getAll: async (params: Record<string, string> = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return await fetchWithAuth(`/products${queryString ? `?${queryString}` : ''}`);
    },
    getById: async (id: string) => {
      return await fetchWithAuth(`/products/${id}`);
    },
    getFeatured: async () => {
      return await fetchWithAuth('/products/featured');
    },
    create: async (productData: FormData | Record<string, any>) => {
      return await fetchWithAuth('/products', {
        method: 'POST',
        body: productData instanceof FormData ? productData : JSON.stringify(productData)
      });
    },
    update: async (id: string, productData: FormData | Record<string, any>) => {
      return await fetchWithAuth(`/products/${id}`, {
        method: 'PUT',
        body: productData instanceof FormData ? productData : JSON.stringify(productData)
      });
    },
    delete: async (id: string) => {
      return await fetchWithAuth(`/products/${id}`, {
        method: 'DELETE'
      });
    }
  },
  
  // Orders
  orders: {
    getAll: async (params: Record<string, string> = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return await fetchWithAuth(`/orders${queryString ? `?${queryString}` : ''}`);
    },
    getById: async (id: string) => {
      return await fetchWithAuth(`/orders/${id}`);
    },
    getRecent: async () => {
      return await fetchWithAuth('/orders/recent');
    },
    create: async (orderData: Record<string, any>) => {
      return await fetchWithAuth('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
    },
    updateStatus: async (id: string, status: string) => {
      return await fetchWithAuth(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    }
  },
  
  // Dashboard
  dashboard: {
    getStats: async () => {
      return await fetchWithAuth('/dashboard/stats');
    },
    getRecentOrders: async () => {
      return await fetchWithAuth('/dashboard/recent-orders');
    },
    getSalesByStatus: async () => {
      return await fetchWithAuth('/dashboard/sales-by-status');
    },
    getLowStockProducts: async () => {
      return await fetchWithAuth('/dashboard/low-stock');
    }
  }
};

export default api; 