
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { InsurancePlan } from '@/components/PlanCard';

interface PlanCardActionsProps {
  plan: InsurancePlan;
  isSelectedForComparison: boolean;
  onBuyNow: (planName: string) => void;
  onToggleCompare: (plan: InsurancePlan) => void;
}

const PlanCardActions: React.FC<PlanCardActionsProps> = ({
  plan,
  isSelectedForComparison,
  onBuyNow,
  onToggleCompare
}) => {
  return (
    <div className="flex flex-col items-end ml-4 gap-2">
      <button 
        className="bg-primary text-white py-1 px-3 rounded text-sm"
        onClick={() => onBuyNow(plan.name)}
      >
        Buy Now
      </button>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id={`compare-${plan.id}`} 
          checked={isSelectedForComparison}
          onCheckedChange={() => onToggleCompare(plan)}
        />
        <label htmlFor={`compare-${plan.id}`} className="text-xs">Add to Compare</label>
      </div>
    </div>
  );
};

export default PlanCardActions;
