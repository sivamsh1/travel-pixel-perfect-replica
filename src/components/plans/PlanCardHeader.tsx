
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-between'} items-start`}>
      <div>
        <h3 className="font-bold text-lg text-[#FF6B35]">{name}</h3>
        <p className="text-sm text-gray-600">{details}</p>
      </div>
      
      <div className={isMobile ? 'w-full' : 'text-right'}>
        {travellersCount !== undefined && (
          <div className="text-xs text-gray-500">{travellersCount} traveller(s)</div>
        )}
        <div className="text-xl font-bold text-[#FF6B35]">{price}</div>
      </div>
    </div>
  );
};

export default PlanCardHeader;
