
import React from 'react';
import PlanCard from '@/components/PlanCard';
import { InsurancePlan } from '@/types/insurance';
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
      <div className="w-full space-y-6 mb-20">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-60" />
                </div>
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-full" />
              <div className="flex flex-wrap gap-2 mt-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
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

