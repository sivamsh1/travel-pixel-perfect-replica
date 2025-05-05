
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface ConnectionWarningProps {
  isConnected: boolean;
  isLoading: boolean;
}

const ConnectionWarning: React.FC<ConnectionWarningProps> = ({ isConnected, isLoading }) => {
  // Don't show anything if connected and not loading
  if (isConnected && !isLoading) return null;
  
  // Connection warning
  if (!isConnected) {
    return (
      <div className="w-full p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-center space-x-2">
        <Loader2 className="h-4 w-4 text-yellow-700 animate-spin" />
        <div>
          <p className="text-yellow-700 font-medium">
            Connecting to quote service... Please wait.
          </p>
          <p className="text-yellow-600 text-sm">
            This may take a few moments. Socket.IO connection in progress.
          </p>
        </div>
      </div>
    );
  }
  
  // Loading quotes warning
  return (
    <div className="w-full p-4 mb-4 bg-blue-50 border border-blue-200 rounded-md flex items-center space-x-2">
      <Loader2 className="h-4 w-4 text-blue-700 animate-spin" />
      <div>
        <p className="text-blue-700 font-medium">
          Loading quotes... More quotes will appear as they become available.
        </p>
        <p className="text-blue-600 text-sm">
          Socket.IO connected. Waiting for quote data...
        </p>
      </div>
    </div>
  );
};

export default ConnectionWarning;
