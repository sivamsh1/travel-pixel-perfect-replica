
import React from 'react';
import { TableHead, TableRow } from "@/components/ui/table";
import { PlanToCompare } from '@/components/ComparePopup';

interface PlanHeadersProps {
  plans: PlanToCompare[];
}

const PlanHeaders: React.FC<PlanHeadersProps> = ({ plans }) => {
  return (
    <TableRow>
      <TableHead className="w-1/3 border-r">Coverage Plan</TableHead>
      {plans.map((plan, index) => (
        <TableHead 
          key={plan.id} 
          className={`w-1/3 text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}
        >
          <div className={`rounded-md p-2 text-center ${index === 0 ? 'bg-[#143d7a]' : 'bg-[#FF6B35]'}`}>
            <div className="text-white font-bold">{plan.name.replace(/_/g, ' ')}</div>
            <div className="text-white text-xs">{plan.description}</div>
          </div>
          <div className="mt-3 font-bold text-center text-lg">
            {plan.price || (index === 0 ? '₹ 3998' : '₹ 2500')}
          </div>
        </TableHead>
      ))}
    </TableRow>
  );
};

export default PlanHeaders;
