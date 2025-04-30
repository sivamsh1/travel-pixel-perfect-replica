
import React from 'react';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlansListProps {
  apiQuotes: InsurancePlan[];
  travellersCount: number;
  onBuyNow: (planName: string) => void;
  isSelectedForComparison: (planId: string) => boolean;
  onToggleCompare: (plan: InsurancePlan) => void;
  isLoading?: boolean;
}

const PlansList: React.FC<PlansListProps> = ({ 
  apiQuotes, 
  travellersCount,
  onBuyNow,
  isSelectedForComparison,
  onToggleCompare,
  isLoading = false
}) => {
  const isMobile = useIsMobile();
  
  // First check if we're in a loading state
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 mb-20">
        <img 
          src="/lovable-uploads/loader/Flight loader.gif" 
          alt="Loading" 
          className="w-40 h-40 object-contain mb-4"
        />
        <p className="text-lg font-medium text-gray-600">Loading available plans...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we find the best options for you</p>
      </div>
    );
  }

  // Only after loading is complete, check if we have quotes
  // Filter out plans with netPremium <= 0 or invalid
  const nonZeroPlans = apiQuotes.filter(
    (plan) => plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0
  );

  if (nonZeroPlans.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-gray-500">No plans available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 mb-20">
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
