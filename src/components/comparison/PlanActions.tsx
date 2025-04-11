
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PlanToCompare } from '@/components/ComparePopup';

interface PlanActionsProps {
  plans: PlanToCompare[];
  onBuyNow: (planName: string) => void;
}

const PlanActions: React.FC<PlanActionsProps> = ({ plans, onBuyNow }) => {
  return (
    <TableRow>
      <TableCell className="border-r">
        <div className="text-blue-600 font-bold">Pick this plan that best fits for you</div>
      </TableCell>
      {plans.map((plan, index) => (
        <TableCell key={index} className={`text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}>
          <div className="text-xs mb-2 text-gray-500">
            Have any query about this policy? Contact us
          </div>
          <Button 
            className={`${index === 0 ? 'bg-[#143d7a] hover:bg-[#143d7a]/80' : 'bg-[#FF6B35] hover:bg-[#FF6B35]/80'} cursor-pointer transition-colors`}
            size="sm"
            onClick={() => onBuyNow(plan.name)}
          >
            Buy Now
          </Button>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default PlanActions;
