
import React from 'react';
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="w-full max-w-3xl space-y-6 mb-10">
        {/* Skeleton loading animations for 3 plan cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-7 w-28 mt-1" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
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
    </div>
  );
};

export default LoadingPlans;
