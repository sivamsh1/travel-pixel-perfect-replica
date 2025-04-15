
import React from 'react';

interface PlanCardLogoProps {
  logo: string;
  provider: string;
}

const PlanCardLogo: React.FC<PlanCardLogoProps> = ({ logo, provider }) => {
  return (
    <div className="p-2 rounded-lg border border-gray-100 flex items-center justify-center bg-white shadow-sm">
      <img 
        src={logo} 
        alt={`${provider} logo`} 
        className="h-10 w-auto object-contain" 
      />
    </div>
  );
};

export default PlanCardLogo;
