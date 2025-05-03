import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse, isValid } from 'date-fns';
import { Ambulance, HandHeart, Car, Check } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { saveToLocalStorage } from '@/utils/localStorageUtils';
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
  sumInsured?: number; // Added sumInsured property
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
  const {
    destination,
    startDate,
    endDate,
    travellers
  } = useTravelForm();
  const isPremiumValid = plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0;
  const handleBuyNow = () => {
    if (!isPremiumValid) return;
    const planData = {
      name: plan.name,
      provider: plan.provider,
      price: plan.price,
      details: plan.details,
      insurer: `${plan.provider} ${plan.name}`,
      sumInsured: 'USD 50000'
    };
    saveToLocalStorage('selectedPlan', planData);
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
    }).filter(Boolean);
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
    const purchaseData = {
      destination: destination || "679e707834ecd414eb0004de",
      dob: dob.length ? dob : ["17/08/1997"],
      startDate: formattedStartDate || "19/06/2025",
      returnDate: formattedEndDate || "29/07/2025"
    };
    console.log('Purchase data:', JSON.stringify(purchaseData, null, 2));
    onBuyNow(plan.name);
    navigate('/addons');
  };
  const renderBuyNowButton = () => {
    const button = <button className={`bg-[#00B2FF] text-white py-3 px-6 rounded-md font-medium ${!isPremiumValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00A0E6]'}`} onClick={isPremiumValid ? handleBuyNow : undefined} disabled={!isPremiumValid}>
        Buy Now
      </button>;
    if (!isPremiumValid) {
      return <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>Not Available</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>;
    }
    return button;
  };

  // This function returns the appropriate icon component based on the benefit text
  const getBenefitIcon = (text: string) => {
    const textLower = text.toLowerCase();
    if (textLower.includes('medical') || textLower.includes('emergency')) {
      return <Ambulance className="text-[#00B2FF] w-5 h-5" />;
    } else if (textLower.includes('lifestyle') || textLower.includes('living')) {
      return <HandHeart className="text-[#00B2FF] w-5 h-5" />;
    } else if (textLower.includes('domestic') || textLower.includes('roadside') || textLower.includes('transportation')) {
      return <Car className="text-[#00B2FF] w-5 h-5" />;
    } else {
      return <Check className="text-[#00B2FF] w-5 h-5" />;
    }
  };

  // New helper function to shorten coverage point text
  const shortenCoveragePoint = (point: string): string => {
    // Extract the amount from the beginning
    const amountMatch = point.match(/\$\s*(\d+,?)+/);
    const amount = amountMatch ? amountMatch[0] : '';

    // Identify common benefit types to extract the main part
    if (point.toLowerCase().includes('medical')) {
      return `${amount} Medical Expenses`;
    } else if (point.toLowerCase().includes('evacuation')) {
      return `${amount} Emergency Evacuation`;
    } else if (point.toLowerCase().includes('baggage')) {
      return `${amount} Baggage Coverage`;
    } else if (point.toLowerCase().includes('delay')) {
      return `${amount} Travel Delay`;
    } else if (point.toLowerCase().includes('repatriation')) {
      return `${amount} Repatriation`;
    } else {
      // For other cases, just take the first few words
      const words = point.split(' ');
      return words.length > 4 ? `${amount} ${words.slice(1, 3).join(' ')}` : point;
    }
  };
  return <div className="border border-[#E5E7EB] rounded-2xl p-6 relative">
      <div className="flex flex-col space-y-5">
        {/* Header section with logo, name, details, and price */}
        <div className="flex justify-between">
          {/* Logo and plan details */}
          <div className="flex space-x-4">
            <div className="flex items-center justify-center">
              <img src={plan.logo} alt={`${plan.provider} logo`} className="h-10 w-auto object-contain max-w-[120px]" onError={e => {
              e.currentTarget.src = '/placeholder.svg';
            }} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-xl text-[#FF6B35]">
                {plan.name.replace(/_/g, ' ')}
              </h3>
              <p className="text-gray-500 text-sm">{plan.details}</p>
            </div>
          </div>
          
          {/* Travellers count and price */}
          <div className="text-right">
            {plan.travellersCount !== undefined && <div className="text-sm text-gray-500">{plan.travellersCount} Traveller(s)</div>}
            <div className="text-2xl font-bold text-[#FF6B35]">{plan.price}</div>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="flex flex-wrap items-center gap-6">
          {plan.benefits.slice(0, 3).map((benefit, index) => <div key={index} className="flex items-center gap-2">
              {getBenefitIcon(benefit.text)}
              <span className="text-[#00B2FF]">{benefit.text}</span>
            </div>)}
        </div>
        
        {/* Plan benefits bar - REDESIGNED with fixed height and proper alignment */}
        <div className="flex h-10 items-center border border-[#E5E7EB] rounded-md bg-gray-50">
          <div className="bg-[#00B2FF] text-white h-full flex items-center px-4 whitespace-nowrap rounded-l-md">
            Plan Benefits
          </div>
          
          <div className="flex-1 px-4 flex items-center justify-between">
            {/* Display only 2 benefits with proper spacing and shortened text */}
            <div className="flex items-center gap-6">
              {plan.coveragePoints.slice(0, 2).map((point, index) => <div key={index} className="text-gray-600 text-sm">
                  {shortenCoveragePoint(point)}
                </div>)}
            </div>
            
            <div className="text-[#00B2FF] cursor-pointer whitespace-nowrap">
              View All &gt;
            </div>
          </div>
        </div>
        
        {/* Actions row: compare checkbox and buy now button */}
        <div className="flex justify-between items-center">
          {/* Add to Compare checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id={`compare-${plan.id}`} checked={isSelectedForComparison} onChange={() => onToggleCompare(plan)} className="rounded border-gray-300 text-[#00B2FF] focus:ring-[#00B2FF]" />
            <label htmlFor={`compare-${plan.id}`} className="text-sm">Add to Compare</label>
          </div>
          
          {/* Buy Now button */}
          {renderBuyNowButton()}
        </div>
      </div>
    </div>;
};
export default PlanCard;
