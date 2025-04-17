
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { InsurancePlan } from '@/components/PlanCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const isMobile = useIsMobile();
  
  // Check if netPremium is valid
  const isPremiumValid = plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0;
  
  // Create the Buy Now button with conditional rendering for disabled state
  const renderBuyNowButton = () => {
    const buttonClass = isPremiumValid 
      ? "bg-primary text-white hover:bg-primary/90"
      : "bg-gray-300 text-gray-500 cursor-not-allowed";
    
    const button = (
      <button 
        className={`py-1 px-3 rounded text-sm ${buttonClass}`}
        onClick={isPremiumValid ? () => onBuyNow(plan.name) : undefined}
        disabled={!isPremiumValid}
      >
        Buy Now
      </button>
    );
    
    if (!isPremiumValid) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>Not Available</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return button;
  };
  
  return (
    <div className={`${isMobile ? 'flex justify-between items-center' : 'flex flex-col items-end ml-4'} gap-2`}>
      {renderBuyNowButton()}
      
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
