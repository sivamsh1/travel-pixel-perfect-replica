
import React from 'react';

interface PlanCardLogoProps {
  logo: string;
  provider: string;
}

const PlanCardLogo: React.FC<PlanCardLogoProps> = ({ logo, provider }) => {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    console.error(`Failed to load logo for provider: ${provider}, path: ${logo}`);
    setHasError(true);
  };

  return (
    <div className="p-2 rounded-lg border border-gray-100 flex items-center justify-center bg-white shadow-sm">
      <img 
        src={hasError ? '/placeholder.svg' : logo}
        alt={`${provider} logo`} 
        className="h-8 w-auto object-contain max-w-[120px]"
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default PlanCardLogo;
