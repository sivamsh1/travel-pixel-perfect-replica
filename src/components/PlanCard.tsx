
import React from 'react';
import { InsurancePlan } from '@/types/insurance';
import { usePlanPurchase } from '@/hooks/usePlanPurchase';
import PlanCardLogo from './plans/PlanCardLogo';
import PlanCardBenefits from './plans/PlanCardBenefits';
import BuyNowButton from './plans/BuyNowButton';

interface PlanCardProps {
  plan: InsurancePlan;
  isSelectedForComparison: boolean;
  onBuyNow: (planName: string) => void;
  onToggleCompare: (plan: InsurancePlan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelectedForComparison,
  onBuyNow,
  onToggleCompare
}) => {
  const { isPremiumValid, handleBuyNow } = usePlanPurchase(plan, onBuyNow);

  return (
    <div className="border border-gray-200 rounded-xl p-6 relative hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <PlanCardLogo logo={plan.logo} provider={plan.provider} />
            <div>
              <h3 className="font-bold text-xl text-[#FF6B35]">
                {plan.name.replace(/_/g, ' ')}
              </h3>
              <p className="text-gray-600 text-sm">{plan.details}</p>
            </div>
          </div>
          
          <div className="text-right">
            {plan.travellersCount !== undefined && (
              <div className="text-xs text-gray-500">{plan.travellersCount} traveller(s)</div>
            )}
            <div className="text-xl font-bold text-[#FF6B35]">{plan.price}</div>
          </div>
        </div>
        
        <PlanCardBenefits benefits={plan.benefits} />
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-white text-sm px-4 py-1.5 rounded-full bg-[#0fb1f6]">
            Plan Benefits
          </div>
          
          {plan.coveragePoints.map((point, index) => (
            <div key={index} className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600">
              {point}
            </div>
          ))}
          
          <div className="text-blue-500 text-sm ml-auto cursor-pointer hover:underline">
            View All →
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id={`compare-${plan.id}`} 
              checked={isSelectedForComparison} 
              onChange={() => onToggleCompare(plan)} 
              className="rounded text-blue-500 focus:ring-blue-500" 
            />
            <label htmlFor={`compare-${plan.id}`} className="text-sm">Add to Compare</label>
          </div>
          
          <BuyNowButton 
            isPremiumValid={isPremiumValid} 
            onClick={handleBuyNow} 
          />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
