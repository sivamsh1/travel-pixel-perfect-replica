
import React from 'react';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import { Skeleton } from "@/components/ui/skeleton";

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
  if (isLoading) {
    return (
      <div className="w-full space-y-5 mb-20">
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
      </div>
    );
  }

  // Only render cards if we have API quotes and we're not in a loading state
  if (apiQuotes.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-gray-500">No plans available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 mb-20">
      {apiQuotes.map((plan) => (
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
