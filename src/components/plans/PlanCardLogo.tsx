
import React from 'react';

interface PlanCardLogoProps {
  logo: string;
  provider: string;
}

const PlanCardLogo: React.FC<PlanCardLogoProps> = ({ logo, provider }) => {
  return (
    <div className="mr-4 bg-blue-50 p-2 rounded-md border border-blue-100 flex items-center justify-center">
      <img 
        src={logo} 
        alt={`${provider} logo`} 
        className="h-8 w-auto object-contain" 
      />
    </div>
  );
};

export default PlanCardLogo;
