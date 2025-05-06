
import React from 'react';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ConnectionWarningProps {
  isConnected: boolean;
  isLoading: boolean;
}

const ConnectionWarning: React.FC<ConnectionWarningProps> = ({ isConnected, isLoading }) => {
  const isMobile = useIsMobile();
  
  // Don't show anything if connected and not loading
  if (isConnected && !isLoading) return null;
  
  // Connection warning - optimized for mobile
  if (!isConnected) {
    return (
      <div className="w-full p-3 md:p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start md:items-center space-x-2">
        <Loader2 className="h-4 w-4 text-yellow-700 animate-spin mt-1 md:mt-0" />
        <div>
          <p className="text-yellow-700 font-medium text-sm md:text-base">
            Fetching the best plans for you...
          </p>
          <p className="text-yellow-600 text-xs md:text-sm">
            This might take a few seconds.
          </p>
          <p className="text-yellow-600 text-xs md:text-sm mt-1">
            <strong>Need help?</strong> If nothing shows up in 30 seconds, try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
  
  // Loading quotes warning - optimized for mobile
  return (
    <div className="w-full p-3 md:p-4 mb-4 bg-blue-50 border border-blue-200 rounded-md flex items-start md:items-center space-x-2">
      <Loader2 className="h-4 w-4 text-blue-700 animate-spin mt-1 md:mt-0" />
      <div>
        <p className="text-blue-700 font-medium text-sm md:text-base">
          Loading quotes... More quotes will appear as they become available.
        </p>
      </div>
    </div>
  );
};

export default ConnectionWarning;
