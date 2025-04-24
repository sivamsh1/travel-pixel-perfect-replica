
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BuyNowButtonProps {
  isPremiumValid: boolean;
  onClick: () => void;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ isPremiumValid, onClick }) => {
  const buttonClass = isPremiumValid ? "bg-blue-500 hover:bg-blue-600 text-white transition-colors" : "bg-gray-300 text-gray-500 cursor-not-allowed";
  
  const button = (
    <button 
      className={`py-2 px-6 rounded-full text-sm font-medium ${buttonClass}`} 
      onClick={isPremiumValid ? onClick : undefined} 
      disabled={!isPremiumValid}
    >
      Buy Now
    </button>
  );

  if (!isPremiumValid) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>Not Available</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export default BuyNowButton;
