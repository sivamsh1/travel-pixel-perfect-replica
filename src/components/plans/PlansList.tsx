
import React from 'react';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import { insurancePlans } from '@/constants/insurancePlans';

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
  // Use API quotes if available, otherwise fallback to hardcoded plans
  const plansToDisplay = apiQuotes.length > 0 
    ? apiQuotes 
    : insurancePlans.map(plan => ({ ...plan, travellersCount }));

  if (isLoading) {
    return (
      <div className="w-full space-y-5 mb-20">
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
        <div className="border border-gray-200 rounded-md p-4 animate-pulse h-24 bg-gray-50"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 mb-20">
      {plansToDisplay.map((plan) => (
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
