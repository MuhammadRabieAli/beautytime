import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

const ServerStatusChecker: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkServerStatus = async () => {
    setStatus('loading');
    try {
      const response = await fetch(`${API_URL}/`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        setStatus('online');
        console.log('API server is online');
      } else {
        setStatus('offline');
        console.error('API server returned an error');
        toast.error('Server is not responding correctly.');
      }
    } catch (error) {
      setStatus('offline');
      console.error('Cannot connect to API server:', error);
      toast.error('Cannot connect to server. Make sure the server is running on port 5000.');
    }
    
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  return (
    <div className="rounded-md p-3 mb-4 flex items-center justify-between" 
      style={{ backgroundColor: status === 'online' ? '#f0f9f0' : '#fef2f2' }}>
      <div className="flex items-center">
        {status === 'loading' ? (
          <RefreshCw className="h-5 w-5 text-gray-500 animate-spin mr-2" />
        ) : status === 'online' ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        )}
        <div>
          <p className="text-sm font-medium">
            Server Status: {status === 'loading' ? 'Checking...' : status === 'online' ? 'Online' : 'Offline'}
          </p>
          {lastChecked && (
            <p className="text-xs text-gray-500">
              Last checked: {lastChecked.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <button
          onClick={checkServerStatus}
          className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Checking...' : 'Check Again'}
        </button>
      </div>
      
      {status === 'offline' && (
        <div className="absolute bottom-full left-0 w-full bg-red-50 border border-red-200 rounded-md p-2 text-xs mt-1">
          <p className="font-bold">Troubleshooting steps:</p>
          <ol className="list-decimal pl-4 mt-1">
            <li>Make sure the server is running with <code>npm run dev</code> in the server directory</li>
            <li>Check if the server is running on port 5000</li>
            <li>Look for any error messages in the server console</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ServerStatusChecker; 