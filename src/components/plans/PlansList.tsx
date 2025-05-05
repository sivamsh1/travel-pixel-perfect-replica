
import React, { useEffect, useRef, useState } from 'react';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import FlightLoader from "../../../public/lovable-uploads/Flightloader-ezgif.com-speed.gif";
import { toast } from "@/components/ui/use-toast";

interface PlansListProps {
  apiQuotes: InsurancePlan[];
  travellersCount: number;
  onBuyNow: (planName: string) => void;
  isSelectedForComparison: (planId: string) => boolean;
  onToggleCompare: (plan: InsurancePlan) => void;
  isLoading?: boolean;
  isConnected?: boolean;
  receivedFirstBatch?: boolean;
}

const PlansList: React.FC<PlansListProps> = ({ 
  apiQuotes, 
  travellersCount,
  onBuyNow,
  isSelectedForComparison,
  onToggleCompare,
  isLoading = false,
  isConnected = true,
  receivedFirstBatch = false
}) => {
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [newPlanAdded, setNewPlanAdded] = useState<boolean>(false);
  const prevQuoteCountRef = useRef<number>(0);
  
  useEffect(() => {
    // Check if we've received new quotes
    if (apiQuotes.length > prevQuoteCountRef.current && prevQuoteCountRef.current > 0) {
      setNewPlanAdded(true);
      
      // Reset notification after 3 seconds
      setTimeout(() => {
        setNewPlanAdded(false);
      }, 3000);
    }
    
    prevQuoteCountRef.current = apiQuotes.length;
  }, [apiQuotes]);

  useEffect(() => {
    if (isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  // First check if we're in a loading state with no quotes
  if (isLoading && apiQuotes.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <img 
          src={FlightLoader} 
          alt="Loading" 
          className="w-80 h-80 mb-4"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const loadingText = document.createElement('p');
              loadingText.textContent = 'Loading...';
              loadingText.className = 'text-xl font-medium text-gray-500';
              parent.appendChild(loadingText);
            }
          }}
        />
        <p className="text-gray-500 text-center">
          {isConnected ? 'Loading available plans...' : 'Connecting to quote service...'}
        </p>
        <div ref={messagesEndRef} />
      </div>
    );
  }

  // Ensure apiQuotes is always an array
  const safeApiQuotes = Array.isArray(apiQuotes) ? apiQuotes : [];
  
  // Filter out plans with netPremium <= 0 or invalid
  const nonZeroPlans = safeApiQuotes.filter(
    (plan) => plan && plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0
  );

  if (safeApiQuotes.length === 0 || nonZeroPlans.length === 0) {
    // Only show "No plans" if we're not loading and connection is good
    if (!isLoading && isConnected && receivedFirstBatch) {
      return (
        <div className="w-full py-10 text-center">
          <p className="text-gray-500">No plans available. Please try adjusting your filters.</p>
        </div>
      );
    }
    
    return (
      <div className="w-full py-10 text-center">
        <img 
          src={FlightLoader} 
          alt="Loading" 
          className="w-40 h-40 mx-auto mb-4"
        />
        <p className="text-gray-500">
          {!isConnected ? 'Connecting to quote service...' : 'Fetching plans...'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 mb-20">
      {newPlanAdded && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-md shadow-lg z-50 animate-pulse">
          New insurance quotes available!
        </div>
      )}
      
      {isLoading && (
        <div className="w-full text-center text-sm text-blue-500">
          More quotes are being loaded...
        </div>
      )}
      
      {nonZeroPlans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelectedForComparison={isSelectedForComparison(plan.id)}
          onBuyNow={onBuyNow}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
};

export default PlansList;
