
import React from 'react';
import FlightLoader from "../../../public/lovable-uploads/Flightloader-ezgif.com-speed.gif";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface LoadingPlansProps {
  isConnected: boolean;
  message?: string;
}

const LoadingPlans: React.FC<LoadingPlansProps> = ({ 
  isConnected, 
  message = "Looking for the best insurance plans for you..." 
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <img 
        src={FlightLoader} 
        alt="Loading" 
        className="w-40 h-40 mb-4"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        {isConnected ? 'Searching Plans' : 'Connecting to Service'}
      </h3>
      
      <p className="text-gray-500 text-center max-w-md mb-4">
        {message}
      </p>
      
      <div className="flex items-center justify-center gap-2 text-primary">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Please wait...</span>
      </div>
      
      {!isConnected && (
        <Alert className="mt-6 max-w-md">
          <AlertTitle>Connection Status</AlertTitle>
          <AlertDescription>
            We're connecting to our quote service. This may take a few moments.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LoadingPlans;
