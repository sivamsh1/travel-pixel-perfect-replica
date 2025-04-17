
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse, isValid } from 'date-fns';
import PlanCardLogo from './plans/PlanCardLogo';
import PlanCardHeader from './plans/PlanCardHeader';
import PlanCardBenefits from './plans/PlanCardBenefits';
import PlanCardCoveragePoints from './plans/PlanCardCoveragePoints';
import PlanCardActions from './plans/PlanCardActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Benefit {
  icon: string;
  text: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  logo: string;
  description: string;
  details: string;
  price: string;
  benefits: Benefit[];
  coveragePoints: string[];
  travellersCount?: number;
  netPremium?: number | null;
}

interface PlanCardProps {
  plan: InsurancePlan;
  isSelectedForComparison: boolean;
  onBuyNow: (planName: string) => void;
  onToggleCompare: (plan: InsurancePlan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelectedForComparison,
  onBuyNow,
  onToggleCompare
}) => {
  const navigate = useNavigate();
  const { destination, startDate, endDate, travellers } = useTravelForm();
  const isMobile = useIsMobile();
  
  // Check if netPremium is valid
  const isPremiumValid = plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0;
  
  // Choose logo based on provider
  const logoUrl = plan.provider.toLowerCase() === 'godigit' 
    ? "/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png" 
    : "/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png";
  
  const handleBuyNow = () => {
    if (!isPremiumValid) return; // Don't proceed if premium is invalid
    
    // Store the selected plan details in localStorage
    const planData = {
      name: plan.name,
      provider: plan.provider,
      price: plan.price,
      details: plan.details,
      insurer: `${plan.provider} ${plan.name}`,
      sumInsured: 'USD 50000' // This would ideally come from the plan data
    };
    
    // Save plan data to localStorage
    saveToLocalStorage('selectedPlan', planData);
    
    // Collect data from previous pages with safe date parsing
    const dob = travellers.map(traveller => {
      if (!traveller.dob) return null;
      
      try {
        const parsedDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate)) return null;
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        console.error('Error parsing traveller DOB:', error);
        return null;
      }
    }).filter(Boolean); // Filter out any null values
    
    // Safely parse and format start date
    let formattedStartDate = '';
    if (startDate) {
      try {
        const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
        if (isValid(parsedStartDate)) {
          formattedStartDate = format(parsedStartDate, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error('Error parsing start date:', error);
      }
    }
    
    // Safely parse and format end date
    let formattedEndDate = '';
    if (endDate) {
      try {
        const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
        if (isValid(parsedEndDate)) {
          formattedEndDate = format(parsedEndDate, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error('Error parsing end date:', error);
      }
    }
    
    // Create the data object to log
    const purchaseData = {
      destination: destination || "679e707834ecd414eb0004de", // Fallback to the requested value
      dob: dob.length ? dob : ["17/08/1997"], // Fallback to the requested value
      startDate: formattedStartDate || "19/06/2025", // Fallback to the requested value
      returnDate: formattedEndDate || "29/07/2025", // Fallback to the requested value
    };
    
    // Log the data as JSON
    console.log('Purchase data:', JSON.stringify(purchaseData, null, 2));
    
    // Call the original onBuyNow function
    onBuyNow(plan.name);
    
    // Navigate to the next page
    navigate('/addons');
  };
  
  // Create the Buy Now button with conditional rendering for disabled state
  const renderBuyNowButton = () => {
    const buttonClass = isPremiumValid 
      ? "bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      : "bg-gray-300 text-gray-500 cursor-not-allowed";
    
    const button = (
      <button 
        className={`py-2 px-6 rounded-full text-sm font-medium ${buttonClass}`}
        onClick={isPremiumValid ? handleBuyNow : undefined}
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
  
  return (
    <div className="border border-gray-200 rounded-xl p-6 relative hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <PlanCardLogo logo={logoUrl} provider={plan.provider} />
            <div>
              <h3 className="font-bold text-xl text-[#FF6B35]">{plan.name}</h3>
              <p className="text-gray-600 text-sm">{plan.details}</p>
            </div>
          </div>
          
          <div className="text-right">
            {plan.travellersCount !== undefined && (
              <div className="text-xs text-gray-500">{plan.travellersCount} traveller(s)</div>
            )}
            <div className="text-xl font-bold text-[#FF6B35]">{plan.price}</div>
          </div>
        </div>
        
        <PlanCardBenefits benefits={plan.benefits} />
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full">
            Plan Benefits
          </div>
          
          {plan.coveragePoints.map((point, index) => (
            <div key={index} className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600">
              {point}
            </div>
          ))}
          
          <div className="text-blue-500 text-sm ml-auto cursor-pointer hover:underline">
            View All →
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`compare-${plan.id}`}
              checked={isSelectedForComparison}
              onChange={() => onToggleCompare(plan)}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor={`compare-${plan.id}`} className="text-sm">Add to Compare</label>
          </div>
          
          {renderBuyNowButton()}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
