
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';
import PlanCardLogo from './plans/PlanCardLogo';
import PlanCardHeader from './plans/PlanCardHeader';
import PlanCardBenefits from './plans/PlanCardBenefits';
import PlanCardCoveragePoints from './plans/PlanCardCoveragePoints';
import PlanCardActions from './plans/PlanCardActions';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  // Use the consistent Reliance logo for all plans
  const relianceLogo = "/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png";
  
  const handleBuyNow = () => {
    // Collect data from previous pages
    const dob = travellers.map(traveller => {
      return traveller.dob ? format(parse(traveller.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    }).filter(Boolean);
    
    const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    
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
  
  return (
    <div className="border border-gray-200 rounded-xl p-6 relative hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <PlanCardLogo logo={relianceLogo} provider={plan.provider} />
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
          
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
