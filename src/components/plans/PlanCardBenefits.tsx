
import React from 'react';
import { Check } from 'lucide-react';

interface Benefit {
  icon: string;
  text: string;
}

interface PlanCardBenefitsProps {
  benefits: Benefit[];
}

const PlanCardBenefits: React.FC<PlanCardBenefitsProps> = ({ benefits }) => {
  return (
    <div className="flex flex-wrap gap-8 text-sm">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-700">
          <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-blue-500" />
          </span>
          <span>{benefit.text}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanCardBenefits;
