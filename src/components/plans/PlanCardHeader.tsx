
import React from 'react';

interface PlanCardHeaderProps {
  name: string;
  details: string;
  travellersCount?: number;
  price: string;
}

const PlanCardHeader: React.FC<PlanCardHeaderProps> = ({ 
  name, 
  details, 
  travellersCount, 
  price 
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg text-[#FF6B35]">{name}</h3>
        <p className="text-sm text-gray-600">{details}</p>
      </div>
      
      <div className="text-right">
        {travellersCount !== undefined && (
          <div className="text-xs text-gray-500">{travellersCount} traveller(s)</div>
        )}
        <div className="text-xl font-bold text-[#FF6B35]">{price}</div>
      </div>
    </div>
  );
};

export default PlanCardHeader;
