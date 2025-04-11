
import React from 'react';

interface Benefit {
  icon: string;
  text: string;
}

interface PlanCardBenefitsProps {
  benefits: Benefit[];
}

const PlanCardBenefits: React.FC<PlanCardBenefitsProps> = ({ benefits }) => {
  return (
    <div className="flex mt-4 gap-6 text-sm">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center gap-1 text-gray-700">
          <span className="w-4 h-4 text-primary">{benefit.icon}</span>
          <span>{benefit.text}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanCardBenefits;
