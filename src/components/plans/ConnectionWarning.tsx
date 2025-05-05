
import React from 'react';

interface ConnectionWarningProps {
  isConnected: boolean;
  isLoading: boolean;
}

const ConnectionWarning: React.FC<ConnectionWarningProps> = ({ isConnected, isLoading }) => {
  if (isConnected || isLoading) return null;
  
  return (
    <div className="w-full p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-yellow-700">
        Connecting to quote service... Please wait.
      </p>
    </div>
  );
};

export default ConnectionWarning;
