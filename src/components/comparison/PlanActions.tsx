
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PlanToCompare } from '@/components/ComparePopup';
import { useTravelForm } from '@/context/TravelFormContext';

interface PlanActionsProps {
  plans: PlanToCompare[];
  onBuyNow: (planName: string) => void;
}

const PlanActions: React.FC<PlanActionsProps> = ({ plans, onBuyNow }) => {
  const navigate = useNavigate();
  const { setSelectedPlan } = useTravelForm();

  const handleBuyNow = (planName: string) => {
    // Update the selected plan
    setSelectedPlan(planName);
    
    // Call the original onBuyNow function
    onBuyNow(planName);
    
    // Navigate directly to the next page
    navigate('/addons');
  };

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
            onClick={() => handleBuyNow(plan.name)}
          >
            Buy Now
          </Button>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default PlanActions;
