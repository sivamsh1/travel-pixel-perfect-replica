
import React from 'react';
import CoverageExpander from './CoverageExpander';

interface Benefit {
  icon: string;
  text: string;
  amount: string;
}

interface PlanCardBenefitsProps {
  benefits: Benefit[];
}

const PlanCardBenefits: React.FC<PlanCardBenefitsProps> = ({ benefits }) => {
  return (
    <div className="space-y-4">
      <div className="text-white text-sm px-4 py-1.5 rounded-full bg-[#0fb1f6] w-fit">
        Plan Benefits
      </div>
      <CoverageExpander coveragePoints={benefits} />
    </div>
  );
};

export default PlanCardBenefits;
